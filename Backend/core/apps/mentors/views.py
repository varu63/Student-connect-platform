from rest_framework import generics

from .models import Mentor
from .serializers import (
    MentorListSerializer,
    MentorDetailSerializer
)
from rest_framework.permissions import AllowAny





# For /mentors/
class MentorListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Mentor.objects.all().order_by("-rating")
    serializer_class = MentorListSerializer


# For /mentors/<id>/
class MentorDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Mentor.objects.all()
    serializer_class = MentorDetailSerializer
    lookup_field = "id"
