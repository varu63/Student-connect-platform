from rest_framework import serializers
from .models import Project, Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'project', 'user', 'text', 'created_at']


class ProjectSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "tech",
            "difficulty",
            "description",
            "comments",
        ]
