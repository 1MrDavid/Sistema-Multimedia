from django.db import models

# Create your models here.
# class Video(models.Model):
#     title = models.CharField(max_length=255)
#     video_file = models.FileField(upload_to='videos/')  # Archivos se guardan en media/videos/
#     thumbnail = models.ImageField(upload_to='thumbnails/')  # Archivos se guardan en media/thumbnails/

#     def __str__(self):
#         return self.title
    
# class Image(models.Model):
#     title = models.CharField(max_length=255)
#     image_file = models.ImageField(upload_to='images/')  # Archivos se guardan en media/images/

#     def __str__(self):
#         return self.title