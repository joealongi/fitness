from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.HealthCheckView.as_view(), name='health-check'),
    path('norse-test/', views.NorseTestView.as_view(), name='norse-test'),
    path('workouts/', views.WorkoutView.as_view(), name='workouts'),
    path('chroma-test/', views.ChromaTestView.as_view(), name='chroma-test'),
    path('norse-vo2/', views.NorseVO2View.as_view(), name='norse-vo2'),

    # Payment endpoints
    path('payments/create-intent/', views.CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('payments/webhook/', views.StripeWebhookView.as_view(), name='stripe-webhook'),
    path('subscription/status/', views.SubscriptionStatusView.as_view(), name='subscription-status'),
    path('subscription/plans/', views.SubscriptionPlansView.as_view(), name='subscription-plans'),
    path('subscription/cancel/', views.CancelSubscriptionView.as_view(), name='cancel-subscription'),
]
