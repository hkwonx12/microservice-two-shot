from django.db import models
from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=100, unique=True)

class Hats(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(LocationVO,
        related_name="location",on_delete=models.CASCADE)
