from django.urls import path
from .views import MentorListView, MentorDetailView

urlpatterns = [
    path('', MentorListView.as_view(), name='mentor-list'),
    path('<int:id>/', MentorDetailView.as_view(), name='mentor-detail'),
]