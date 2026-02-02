from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "primary_skill",
            "password",
        ]

    def validate_email(self, value):
        # optional but smart: restrict to university email
        if not value.endswith(".edu"):
            raise serializers.ValidationError(
                "Only university email addresses are allowed."
            )
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "primary_skill",
            "created_at",
        ]
        read_only_fields = ["email", "created_at"]
