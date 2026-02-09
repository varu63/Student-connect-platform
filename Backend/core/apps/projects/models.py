from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    tech = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=20)
    description = models.TextField()
    

    def __str__(self):
        return self.title
