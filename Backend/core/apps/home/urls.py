from django.urls import path
from .views import home ,home_api

urlpatterns = [
    path("", home),
    path("api/", home_api), 
]