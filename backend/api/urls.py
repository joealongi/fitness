from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.HealthCheckView.as_view(), name='health-check'),
    path('norse-test/', views.NorseTestView.as_view(), name='norse-test'),
    path('workouts/', views.WorkoutView.as_view(), name='workouts'),
]
