import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models.usuario import User
from api.serializers.usuario import *
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Sum
from datetime import *


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")
    
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action in ['list' , 'retrieve' , 'vendedores' , 'vendedor']:
            return UserReadSerializer
        else:
            return UserSerializer
            
    def get_permissions(self):
        if self.action in [""]:
            permissions = [AllowAny]
        elif self.action in [""]:
            permissions = [AllowAny]
        return [permission() for permission in permissions]

       
    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer= []
        if user.tipo_usuario == 30:
            serializer = MeUserSerializer(user)
        else:
            serializer = MeSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=["post"], detail=False)
    def login(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                if user.is_active==True:
                    token, created = Token.objects.get_or_create(user=user)
                    serializer = UserReadSerializer(user)
                    data.pop('password')
                    return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "Parece que tu usuario aun no ha sido aprobado"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": "Hubo un error con el usuario o la contraseña"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Hubo un error con el usuario o la contraseña"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
            
    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)
