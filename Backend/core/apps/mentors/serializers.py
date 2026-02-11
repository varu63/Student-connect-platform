from rest_framework import serializers
from .models import Mentor, MentorshipPlan, MentorProject


class MentorshipPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorshipPlan
        fields = ["title", "price", "duration", "features"]


class MentorProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProject
        fields = ["title", "description", "link"]


class MentorDetailSerializer(serializers.ModelSerializer):

    # Rename: plans -> pricing
    pricing = MentorshipPlanSerializer(
        source="plans",
        many=True,
        read_only=True
    )

    # Rename: skills -> techStack
    techStack = serializers.ListField(
        source="skills"
    )

    # Rename: past_projects -> pastProjects
    pastProjects = MentorProjectSerializer(
        source="past_projects",
        many=True,
        read_only=True
    )

    # Rename: experience_years -> experience
    experience = serializers.IntegerField(
        source="experience_years"
    )

    class Meta:
        model = Mentor
        fields = [
            "id",
            "name",
            "role",
            "company",
            "bio",
            "rating",
            "reviews_count",
            "pricing",
            "techStack",
            "pastProjects",
            "experience",
            "profile_image",
        ]
class MentorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = [
            "id",
            "name",
            "role",
            "rating",
            "profile_image",
        ]
