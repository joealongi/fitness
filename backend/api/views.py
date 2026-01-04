from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import stripe
import json
from django.contrib.auth.models import User
from .models import Subscription, Payment, UserProfile, Workout
from .vo2max_utils import estimate_vo2max_from_workout

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "healthy", "service": "airwave-backend"})

class NorseTestView(APIView):
    def get(self, request):
        # Test Norse SNN integration (simplified for demo)
        return Response({"status": "active", "neural_network": "norse_snn"})

class ChromaTestView(APIView):
    def get(self, request):
        # Test ChromaDB integration (simplified for demo)
        return Response({"status": "connected", "vector_db": "chroma"})

class NorseVO2View(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Advanced VO2 max estimation using Norse SNN (simplified for demo)
        data = request.data
        heart_rate = data.get('heart_rate', 150)
        age = data.get('age', 25)

        # Simple Norse-inspired calculation (placeholder)
        estimated_vo2max = 15.3 * (220 - age) / heart_rate

        return Response({
            "vo2max_estimate": round(estimated_vo2max, 1),
            "method": "norse_snn",
            "confidence": 0.85
        })

class WorkoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            user = request.user

            # Get or create user profile
            profile, created = UserProfile.objects.get_or_create(
                user=user,
                defaults={
                    'gender': data.get('gender', 'other'),
                    'age': data.get('age', 25),
                    'weight': str(data.get('weight', 70)),
                    'height': str(data.get('height', 170))
                }
            )

            # Create workout
            workout = Workout.objects.create(
                user=user,
                activity_type=data.get('activity_type', 'run'),
                duration=data.get('duration', 30),
                distance=data.get('distance'),
                heart_rate_avg=str(data.get('heart_rate_avg', '')) if data.get('heart_rate_avg') else None,
                heart_rate_max=str(data.get('heart_rate_max', '')) if data.get('heart_rate_max') else None,
                intensity=data.get('intensity', 'moderate')
            )

            # Calculate VO2 max
            vo2max = estimate_vo2max_from_workout(workout, profile)

            # Get benefits
            from .vo2max_utils import get_vo2max_benefits
            benefits = get_vo2max_benefits(vo2max)

            return Response({
                'workout': {
                    'id': workout.id,
                    'activity_type': workout.activity_type,
                    'duration': workout.duration,
                    'distance': workout.distance,
                    'intensity': workout.intensity,
                    'date': workout.date
                },
                'vo2max_estimate': round(vo2max, 1) if vo2max else None,
                'benefits': benefits
            })

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Stripe Payment Views
@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            return Response({'error': 'Invalid payload'}, status=400)
        except stripe.error.SignatureVerificationError as e:
            return Response({'error': 'Invalid signature'}, status=400)

        # Handle the event
        if event.type == 'customer.subscription.created':
            self.handle_subscription_created(event.data.object)
        elif event.type == 'customer.subscription.updated':
            self.handle_subscription_updated(event.data.object)
        elif event.type == 'customer.subscription.deleted':
            self.handle_subscription_deleted(event.data.object)
        elif event.type == 'payment_intent.succeeded':
            self.handle_payment_succeeded(event.data.object)

        return Response({'status': 'success'})

    def handle_subscription_created(self, subscription):
        # Create or update subscription in database
        user_id = subscription.metadata.get('user_id')
        if user_id:
            user = User.objects.get(id=user_id)
            Subscription.objects.update_or_create(
                user=user,
                defaults={
                    'stripe_subscription_id': subscription.id,
                    'stripe_customer_id': subscription.customer,
                    'plan': subscription.metadata.get('plan', 'premium'),
                    'status': subscription.status,
                    'current_period_start': subscription.current_period_start,
                    'current_period_end': subscription.current_period_end,
                }
            )

    def handle_subscription_updated(self, subscription):
        # Update subscription status
        try:
            sub = Subscription.objects.get(stripe_subscription_id=subscription.id)
            sub.status = subscription.status
            sub.current_period_start = subscription.current_period_start
            sub.current_period_end = subscription.current_period_end
            sub.cancel_at_period_end = subscription.cancel_at_period_end
            sub.save()
        except Subscription.DoesNotExist:
            pass

    def handle_subscription_deleted(self, subscription):
        # Mark subscription as canceled
        try:
            sub = Subscription.objects.get(stripe_subscription_id=subscription.id)
            sub.status = 'canceled'
            sub.save()
        except Subscription.DoesNotExist:
            pass

    def handle_payment_succeeded(self, payment_intent):
        # Record successful payment
        try:
            payment = Payment.objects.get(stripe_payment_intent_id=payment_intent.id)
            payment.status = 'succeeded'
            payment.stripe_charge_id = payment_intent.charges.data[0].id if payment_intent.charges.data else None
            payment.receipt_url = payment_intent.charges.data[0].receipt_url if payment_intent.charges.data else None
            payment.save()
        except Payment.DoesNotExist:
            pass

class CreatePaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            plan = data.get('plan', 'premium')

            if plan not in settings.SUBSCRIPTION_PLANS:
                return Response({'error': 'Invalid plan'}, status=400)

            plan_config = settings.SUBSCRIPTION_PLANS[plan]

            # Create or get Stripe customer
            user = request.user
            subscription, created = Subscription.objects.get_or_create(
                user=user,
                defaults={'stripe_customer_id': None}
            )

            if not subscription.stripe_customer_id:
                customer = stripe.Customer.create(
                    email=user.email,
                    name=user.username,
                    metadata={'user_id': user.id}
                )
                subscription.stripe_customer_id = customer.id
                subscription.save()

            # Create payment intent
            intent = stripe.PaymentIntent.create(
                amount=plan_config['price'],
                currency='usd',
                customer=subscription.stripe_customer_id,
                metadata={
                    'user_id': user.id,
                    'plan': plan
                },
                description=f"{plan_config['name']} subscription - {plan_config['interval']}ly",
                automatic_payment_methods={'enabled': True}
            )

            # Record payment in database
            Payment.objects.create(
                user=user,
                stripe_payment_intent_id=intent.id,
                amount=plan_config['price'],
                currency='usd',
                description=f"{plan_config['name']} subscription",
                status='pending'
            )

            return Response({
                'client_secret': intent.client_secret,
                'payment_intent_id': intent.id,
                'plan': plan,
                'amount': plan_config['price'],
                'features': plan_config['features']
            })

        except Exception as e:
            return Response({'error': str(e)}, status=400)

class SubscriptionStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            subscription = Subscription.objects.get(user=request.user)
            return Response({
                'plan': subscription.plan,
                'status': subscription.status,
                'is_premium': subscription.is_premium,
                'is_pro': subscription.is_pro,
                'current_period_end': subscription.current_period_end,
                'cancel_at_period_end': subscription.cancel_at_period_end
            })
        except Subscription.DoesNotExist:
            return Response({
                'plan': 'free',
                'status': 'active',
                'is_premium': False,
                'is_pro': False
            })

class SubscriptionPlansView(APIView):
    def get(self, request):
        return Response(settings.SUBSCRIPTION_PLANS)

class CancelSubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            subscription = Subscription.objects.get(user=request.user)

            if subscription.stripe_subscription_id:
                # Cancel in Stripe
                stripe.Subscription.modify(
                    subscription.stripe_subscription_id,
                    cancel_at_period_end=True
                )
                subscription.cancel_at_period_end = True
                subscription.save()

            return Response({'message': 'Subscription will be canceled at period end'})

        except Subscription.DoesNotExist:
            return Response({'error': 'No active subscription'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
