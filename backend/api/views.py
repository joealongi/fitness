from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Workout, UserProfile
from .serializers import WorkoutSerializer
import torch
import norse
import chromadb
import numpy as np
from .vo2max_utils import estimate_vo2max_from_workout, get_vo2max_benefits
from .chroma_setup import get_chroma_client, create_fitness_collection
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

class ChromaTestView(APIView):
    def get(self, request):
        client = get_chroma_client()
        collection = create_fitness_collection(client)
        # Test adding a sample workout embedding
        sample_embedding = np.random.rand(128).tolist()  # Dummy embedding
        collection.add(
            ids=["sample_workout"],
            embeddings=[sample_embedding],
            metadatas=[{"activity": "run", "duration": 30}]
        )
        results = collection.query(
            query_embeddings=[sample_embedding],
            n_results=1
        )
        return Response({"chroma_status": "ok", "results": results})

class NorseVO2View(APIView):
    def post(self, request):
        # Use Norse SNN for advanced VO2 max estimation
        # Simulate heart rate time series
        heart_rate_data = request.data.get('heart_rate_series', [70] * 100)  # Default dummy data
        input_tensor = torch.tensor(heart_rate_data, dtype=torch.float32).unsqueeze(0).unsqueeze(-1)  # [1, seq_len, 1]

        # Simple SNN model
        model = norse.torch.LIFCell()
        state = None
        outputs = []
        for t in range(input_tensor.size(1)):
            spike_input = input_tensor[:, t, :]
            output, state = model(spike_input, state)
            outputs.append(output)

        # Simple estimation based on spike rate
        spike_rate = torch.stack(outputs).mean().item()
        estimated_vo2max = 20 + (spike_rate * 40)  # Dummy scaling

        return Response({
            "norse_estimated_vo2max": estimated_vo2max,
            "spike_rate": spike_rate,
            "method": "Norse SNN temporal analysis"
        })
