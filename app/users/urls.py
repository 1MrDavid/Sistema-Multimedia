from django.contrib import admin
from django.urls import path, include
from .views import CreateUserView, CustomTokenObtainPairView, CustomTokenRefreshView, ProtectedView

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="refresh"),
    path("protected/", ProtectedView.as_view(), name="protected_view"),
    path("api-auth/", include("rest_framework.urls"))
]