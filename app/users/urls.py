from django.contrib import admin
from django.urls import path, include
from .views import CreateUserView, CustomTokenObtainPairView, CustomTokenRefreshView, ProtectedView, VideoListAPIView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="refresh"),
    path("protected/", ProtectedView.as_view(), name="protected_view"),
    path('videos/', VideoListAPIView.as_view(), name='video-list'),
    path("api-auth/", include("rest_framework.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

