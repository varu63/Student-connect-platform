from django.urls import path
from .views import RegisterView, LoginView, MeView, UpdateProfileView
from apps.accounts import views 

urlpatterns = [
    path('signup/', views.RegisterView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('me/', views.MeView.as_view(), name='me'),
]
