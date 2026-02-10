from django.urls import path
from .views import ProjectDetailView, ProjectListView ,CommentListCreateView

urlpatterns = [
    path("", ProjectListView.as_view()),
    path("<int:id>/", ProjectDetailView.as_view()),
    path("comments/", CommentListCreateView.as_view()),

]
