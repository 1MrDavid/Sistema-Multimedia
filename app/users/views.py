import logging
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from .serializers import CustomUserSerializer, VideoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Video, CustomUser

logger = logging.getLogger(__name__)

User = get_user_model()

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
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.info(f"Usuario autenticado en la vista: {request.user.username}")
        return Response({"message": "Esta es una vista protegida", "user": request.user.username})
    
class VideoListAPIView(generics.ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Video.objects.select_related('channel').all()