import logging
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse
# from .models import Video, Image

logger = logging.getLogger(__name__)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        
        # Llama la implementación original para obtener los tokens
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            #Guarda el token de acceso en una cookie
            access_token = response.data["access"]
            refresh_token = response.data["refresh"]

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='None',
                secure=True,
                max_age=3600,
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                samesite='None',
                secure=True,
                max_age=86400,
            )
        
        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            logger.error("Refresh token no proporcionado en las cookies")  # Log de error
            return Response({"error": "Refresh token no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

        # Agrega el refresh_token al cuerpo de la solicitud
        request.data["refresh"] = refresh_token

        # Llama a la implementación original para refrescar el token
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            logger.info(f"Token refrescado exitosamente para el usuario")  # Log de éxito
        else:
            logger.error(f"Error al refrescar el token: {response.data}")  # Log de error

        return response

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.info(f"Usuario autenticado en la vista: {request.user.username}")
        return Response({"message": "Esta es una vista protegida", "user": request.user.username})
    
# def video_list(request):
#     # Obtener la lista de videos
#     videos = Video.objects.all()
#     video_data = [
#         {
#             'type': 'video',
#             'title': video.title,
#             'file_url': video.video_file.url,
#             'thumbnail_url': video.thumbnail.url,
#         }
#         for video in videos
#     ]

#     # Obtener la lista de imágenes
#     images = Image.objects.all()
#     image_data = [
#         {
#             'type': 'image',
#             'title': image.title,
#             'file_url': image.image_file.url,
#         }
#         for image in images
#     ]

#     # Combinar las listas de videos e imágenes
#     data = video_data + image_data

#     return JsonResponse(data, safe=False)