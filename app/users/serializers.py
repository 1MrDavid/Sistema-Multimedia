from rest_framework import serializers
from .models import Video, CustomUser

# Creacion de un nuevo usuario
class CustomUserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = CustomUser  
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    
# Para los videos
class VideoSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    icon = serializers.SerializerMethodField()
    video_file = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = '__all__'

    def get_thumbnail(self, obj):
        return self._build_api_media_url(obj.thumbnail.name)

    def get_icon(self, obj):
        return self._build_api_media_url(obj.icon.name)

    def get_video_file(self, obj):
        return self._build_api_media_url(obj.video_file.name)

    def _build_api_media_url(self, path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(f'/api/media/{path}')
        return f'http://localhost:8000/api/media/{path}'