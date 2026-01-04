import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fitness_backend.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile

# Create demo user
user, created = User.objects.get_or_create(username='demo', defaults={'email': 'demo@example.com'})
if created:
    user.set_password('demo123')
    user.save()

# Create profile
profile, created = UserProfile.objects.get_or_create(
    user=user,
    defaults={
        'age': 30,
        'gender': 'male',
        'weight': 70,
        'height': 175,
    }
)

print("Demo user and profile created.")
