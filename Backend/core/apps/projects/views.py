from rest_framework import generics , filters
from rest_framework.pagination import PageNumberPagination
from .models import Project  # Ensure you have a Project model
from .serializers import ProjectSerializer # Create this if you haven't

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8 # Number of projects per page
    page_size_query_param = 'page_size'
    max_page_size = 10

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-id')
    serializer_class = ProjectSerializer
    pagination_class = StandardResultsSetPagination

    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'tech']
