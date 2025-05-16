from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Place(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    img = models.ImageField(upload_to='images/', blank=True, null=True) ## zdj nie wymagane
    category = models.ManyToManyField(Category)
    description = models.TextField(500)
    rating = models.FloatField(default= 0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default= now)
    def __str__(self):
        return self.name
