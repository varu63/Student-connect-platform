from django.urls import path
from .views import ProjectDetailView, ProjectListView ,CommentListCreateView

urlpatterns = [
    path("", ProjectListView.as_view() ,name='project-list'),
    path("<int:id>/", ProjectDetailView.as_view(), name='project-detail'),
    path("comments/", CommentListCreateView.as_view(), name='comment-list-create'),

]
