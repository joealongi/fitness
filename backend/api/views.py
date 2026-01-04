from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import torch
import norse

# Create your views here.

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok", "message": "Fitness API is running"})

class NorseTestView(APIView):
    def get(self, request):
        # Simple test with Norse SNN
        model = norse.torch.LIFCell()
        input_tensor = torch.randn(10, 2)  # batch_size=10, input_size=2
        state = None
        output, state = model(input_tensor, state)
        return Response({"output_shape": list(output.shape), "norse_version": norse.__version__})
