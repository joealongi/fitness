from django.db import models
from django.contrib.auth.models import User
from encrypted_model_fields.fields import EncryptedCharField, EncryptedIntegerField, EncryptedTextField

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Encrypted sensitive health data
    age = EncryptedIntegerField()  # Age is PII
    gender = models.CharField(max_length=10, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ])  # Gender is sensitive but not encrypted for analytics
    weight = EncryptedTextField()  # in kg - sensitive health data (stored as text)
    height = EncryptedTextField()  # in cm - sensitive health data (stored as text)

    def __str__(self):
        return f"{self.user.username} Profile"

    @property
    def weight_kg(self):
        """Get weight as float for calculations"""
        try:
            return float(self.weight) if self.weight else None
        except (ValueError, TypeError):
            return None

    @property
    def height_cm(self):
        """Get height as float for calculations"""
        try:
            return float(self.height) if self.height else None
        except (ValueError, TypeError):
            return None

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50)  # e.g., 'run', 'cycle', 'walk'
    duration = models.FloatField()  # in minutes - not sensitive
    distance = models.FloatField(null=True, blank=True)  # in km - not sensitive
    # Encrypted sensitive biometric data
    heart_rate_avg = EncryptedTextField(null=True, blank=True)  # bpm (stored as text)
    heart_rate_max = EncryptedTextField(null=True, blank=True)  # bpm (stored as text)
    intensity = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('moderate', 'Moderate'),
        ('high', 'High'),
    ], default='moderate')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} on {self.date}"

    @property
    def avg_heart_rate(self):
        """Get average heart rate as float for calculations"""
        try:
            return float(self.heart_rate_avg) if self.heart_rate_avg else None
        except (ValueError, TypeError):
            return None

    @property
    def max_heart_rate(self):
        """Get max heart rate as float for calculations"""
        try:
            return float(self.heart_rate_max) if self.heart_rate_max else None
        except (ValueError, TypeError):
            return None
