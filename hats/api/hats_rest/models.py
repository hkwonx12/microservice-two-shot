from django.db import models
from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href=models.CharField(max_length=100, unique=True)

    # def get_api_url(self):
    #     return reverse("api_location", kwargs={"pk": self.pk})

    # def __str__(self):
    #     return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"

    # class Meta:
    #     ordering = ("closet_name", "section_number", "shelf_number")


class Hats(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color= models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(LocationVO,
        related_name="location",on_delete=models.CASCADE)
