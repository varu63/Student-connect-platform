from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    tech = models.JSONField(default=list)  # List of technologies used
    difficulty = models.CharField(max_length=20)
    description = models.TextField()
    
    
class Comment(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="comments"
    )

    user = models.CharField(max_length=100)

    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:30]


    def __str__(self):
        return self.title
