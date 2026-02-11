from django.db import models

class Mentor(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=255)  # e.g., Senior Frontend Engineer
    company = models.CharField(max_length=200, blank=True)
    bio = models.TextField()
    skills = models.JSONField(default=list)  # Store as ["React", "Python"]
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.5)
    reviews_count = models.IntegerField(default=0)
    experience_years = models.IntegerField()
    profile_image = models.ImageField(upload_to='mentors/', null=True, blank=True)

    def __clstr__(self):
        return self.name

class MentorshipPlan(models.Model):
    mentor = models.ForeignKey(Mentor, related_name='plans', on_delete=models.CASCADE)
    title = models.CharField(max_length=100) # e.g., "1-on-1 Session"
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=100) # e.g., "45 mins" or "1 month"
    features = models.JSONField(default=list) # e.g., ["Resume Review", "Mock Interview"]

class MentorProject(models.Model):
    mentor = models.ForeignKey(Mentor, related_name='past_projects', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True)