from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Workout, UserProfile
from .serializers import WorkoutSerializer
import torch
import norse
from .vo2max_utils import estimate_vo2max_from_workout, get_vo2max_benefits

# Create your views here.

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok", "message": "Airwave API is running"})

class NorseTestView(APIView):
    def get(self, request):
        # Simple test with Norse SNN
        model = norse.torch.LIFCell()
        input_tensor = torch.randn(10, 2)  # batch_size=10, input_size=2
        state = None
        output, state = model(input_tensor, state)
        return Response({"output_shape": list(output.shape), "norse_version": norse.__version__})

class WorkoutView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['user'] = 1  # Hardcoded for demo
        serializer = WorkoutSerializer(data=data)
        if serializer.is_valid():
            workout = serializer.save()
            # Estimate VO2 max
            try:
                profile = UserProfile.objects.get(user_id=1)
                vo2max = estimate_vo2max_from_workout(workout, profile)
                benefits = get_vo2max_benefits(vo2max)
            except UserProfile.DoesNotExist:
                vo2max = None
                benefits = "User profile not found. Please complete your profile for accurate estimates."
            return Response({
                "workout": serializer.data,
                "vo2max_estimate": vo2max,
                "benefits": benefits
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        workouts = Workout.objects.all()  # No filter for demo
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)
