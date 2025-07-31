from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    def __str__(self):
        return self.name
