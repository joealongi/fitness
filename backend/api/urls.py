from django.urls import path
from . import views

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/profile/', views.UserProfileView.as_view(), name='user-profile'),

    # Public endpoints
    path('health/', views.HealthCheckView.as_view(), name='health-check'),
    path('norse-test/', views.NorseTestView.as_view(), name='norse-test'),
    path('chroma-test/', views.ChromaTestView.as_view(), name='chroma-test'),
    path('subscription/plans/', views.SubscriptionPlansView.as_view(), name='subscription-plans'),

    # Protected endpoints
    path('workouts/', views.WorkoutView.as_view(), name='workouts'),
    path('norse-vo2/', views.NorseVO2View.as_view(), name='norse-vo2'),

    # Payment endpoints (protected)
    path('payments/create-intent/', views.CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('payments/webhook/', views.StripeWebhookView.as_view(), name='stripe-webhook'),
    path('subscription/status/', views.SubscriptionStatusView.as_view(), name='subscription-status'),
    path('subscription/cancel/', views.CancelSubscriptionView.as_view(), name='cancel-subscription'),
]
