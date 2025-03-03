from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from .storage import CleanFileNameStorage

class CustomUser(AbstractUser):
    profile_image = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True
    )
    
    class Meta:
        db_table = 'auth_user'

class Video(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    views = models.PositiveIntegerField(default=0)
    duration = models.CharField(max_length=10)
    upload_date = models.DateTimeField(auto_now_add=True)
    thumbnail = models.ImageField(
        upload_to='thumbnails/',
        storage=CleanFileNameStorage()  # <-- Usar aquí
    )
    video_file = models.FileField(
        upload_to='videos/',
        storage=CleanFileNameStorage()  # <-- Usar aquí
    )
    icon = models.ImageField(
        upload_to='icons/',
        storage=CleanFileNameStorage()  # <-- Usar aquí
    )
    categories = models.CharField(max_length=100, blank=True)
    channel = models.ForeignKey('CustomUser', on_delete=models.CASCADE)

    def __str__(self):
        return self.title