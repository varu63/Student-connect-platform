# admin.py
from django.contrib import admin
from .models import Mentor, MentorshipPlan, MentorProject

admin.site.register(Mentor)
admin.site.register(MentorshipPlan)
admin.site.register(MentorProject)

# Register your models here.
