from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.HealthCheckView.as_view(), name='health-check'),
    path('norse-test/', views.NorseTestView.as_view(), name='norse-test'),
    path('workouts/', views.WorkoutView.as_view(), name='workouts'),
    path('chroma-test/', views.ChromaTestView.as_view(), name='chroma-test'),
    path('norse-vo2/', views.NorseVO2View.as_view(), name='norse-vo2'),
]
