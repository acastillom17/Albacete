from django.db import models
from rest_framework import fields, serializers
from api.models.usuario import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
