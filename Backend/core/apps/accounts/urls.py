from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    MeView,
    UpdateProfileView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("signup/", RegisterView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("me/", MeView.as_view(), name="me"),
    path("update/", UpdateProfileView.as_view(), name="update-profile"),
]
