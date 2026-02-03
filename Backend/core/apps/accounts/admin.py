

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User

    list_display = (
        "email",
        "full_name",
        "primary_skill",
        "is_staff",
        "is_active",
        "created_at",
    )

    list_filter = ("is_staff", "is_active", "primary_skill")

    search_fields = ("email", "full_name")

    ordering = ("-created_at",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("full_name", "primary_skill")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
        ("Important Dates", {"fields": ("last_login", "created_at")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "full_name", "primary_skill", "password1", "password2"),
            },
        ),
    )

    filter_horizontal = ("groups", "user_permissions")

