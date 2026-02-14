from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "full_name", "password" ,"primary_skill"]

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    VALID_SKILLS = [
        "React",
        "Django",
        "Python",
        "Java",
        "JavaScript",
        "Node.js",
        "Full Stack",
        "Data Science",
        "DevOps",
    ]

    primary_skill = serializers.ChoiceField(
        choices=VALID_SKILLS,
        required=False,
        allow_blank=True
    )
    class Meta:
        model = User
        fields = ["id", "email", "full_name", "created_at","primary_skill" ,"plan"]
        extra_kwargs = {
            "email": {"read_only": True},
        }


class CustomTokenSerializer(TokenObtainPairSerializer):
    pass
