from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination

from .models import Project, Comment
from .serializers import ProjectSerializer, CommentSerializer


# ---------------- Pagination ----------------

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = "page_size"
    max_page_size = 10


class CommentPagination(PageNumberPagination):
    page_size = 10


# ---------------- Project ----------------

class ProjectListView(generics.ListAPIView):

    queryset = Project.objects.all().order_by("-id")
    serializer_class = ProjectSerializer
    pagination_class = StandardResultsSetPagination

    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description", "tech"]


class ProjectDetailView(generics.RetrieveAPIView):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "id"


# ---------------- Comment ----------------

class CommentListCreateView(generics.ListCreateAPIView):

    queryset = Comment.objects.all().order_by("-created_at")
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    def get_queryset(self):

        project_id = self.request.query_params.get("project")

        qs = super().get_queryset()

        if project_id:
            qs = qs.filter(project_id=project_id)

        return qs
