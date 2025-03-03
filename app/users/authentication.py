import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)

User = get_user_model()

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Extraer el access_token de las cookies
        access_token = request.COOKIES.get("access_token")
        if not access_token:
            logger.info("No se encontró access_token en las cookies")
            return None

        try:
            # Validar el access_token
            validated_token = self.get_validated_token(access_token)
            user_id = validated_token["user_id"]
            user = User.objects.get(id=user_id)
            logger.info(f"Usuario autenticado: {user.username}")
            return (user, validated_token)
        except (InvalidToken, TokenError) as e:
            logger.error(f"Error de autenticación: {str(e)}")
            return None
        except User.DoesNotExist:
            logger.error(f"Usuario no encontrado para el token proporcionado")
            return None