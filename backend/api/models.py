from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ])
    weight = models.FloatField()  # in kg
    height = models.FloatField()  # in cm

    def __str__(self):
        return f"{self.user.username} Profile"

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50)  # e.g., 'run', 'cycle', 'walk'
    duration = models.FloatField()  # in minutes
    distance = models.FloatField(null=True, blank=True)  # in km
    heart_rate_avg = models.FloatField(null=True, blank=True)  # bpm
    heart_rate_max = models.FloatField(null=True, blank=True)  # bpm
    intensity = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('moderate', 'Moderate'),
        ('high', 'High'),
    ], default='moderate')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} on {self.date}"
