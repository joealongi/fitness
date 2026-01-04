from django.db import models
from django.contrib.auth.models import User
from encrypted_model_fields.fields import EncryptedCharField, EncryptedIntegerField, EncryptedTextField
import stripe
from django.conf import settings

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

class Subscription(models.Model):
    """User subscription model for premium features"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)

    plan = models.CharField(max_length=50, choices=[
        ('free', 'Free'),
        ('premium', 'Premium'),
        ('pro', 'Pro'),
    ], default='free')

    status = models.CharField(max_length=50, choices=[
        ('active', 'Active'),
        ('canceled', 'Canceled'),
        ('past_due', 'Past Due'),
        ('incomplete', 'Incomplete'),
        ('trialing', 'Trialing'),
    ], default='active')

    current_period_start = models.DateTimeField(null=True, blank=True)
    current_period_end = models.DateTimeField(null=True, blank=True)
    cancel_at_period_end = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.plan} ({self.status})"

    @property
    def is_premium(self):
        return self.plan in ['premium', 'pro'] and self.status == 'active'

    @property
    def is_pro(self):
        return self.plan == 'pro' and self.status == 'active'

class Payment(models.Model):
    """Payment transaction records"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stripe_payment_intent_id = models.CharField(max_length=255, unique=True)
    stripe_charge_id = models.CharField(max_length=255, blank=True, null=True)

    amount = models.IntegerField()  # Amount in cents
    currency = models.CharField(max_length=3, default='usd')
    status = models.CharField(max_length=50, choices=[
        ('pending', 'Pending'),
        ('succeeded', 'Succeeded'),
        ('failed', 'Failed'),
        ('canceled', 'Canceled'),
    ], default='pending')

    description = models.TextField(blank=True)
    receipt_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - ${self.amount/100:.2f} ({self.status})"

    @property
    def amount_dollars(self):
        """Get amount in dollars"""
        return self.amount / 100
