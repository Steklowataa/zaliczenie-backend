from django.contrib import admin

# Register your models here.
from .models import Place, Category

admin.site.register(Place)
admin.site.register(Category)