from rest_framework import serializers
from .models import Place, Category
from django.contrib.auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

class PlaceSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, read_only=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = Place
        fields = ['id', 'name', 'lat', 'lng', 'img', 'category', 'description', 'rating', 'user', 'created_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation['img'] and instance.img:
            representation['img'] = instance.img.url
            if 'request' in self.context:
                request = self.context['request']
                representation['img'] = request.build_absolute_uri(instance.img.url)

        return representation


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user