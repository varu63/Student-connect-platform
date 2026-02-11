from rest_framework import generics

from .models import Mentor
from .serializers import (
    MentorListSerializer,
    MentorDetailSerializer
)


# For /mentors/
class MentorListView(generics.ListAPIView):
    queryset = Mentor.objects.all().order_by("-rating")
    serializer_class = MentorListSerializer


# For /mentors/<id>/
class MentorDetailView(generics.RetrieveAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorDetailSerializer
    lookup_field = "id"
