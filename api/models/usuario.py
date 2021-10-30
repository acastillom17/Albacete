from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


class UserManager(UserManager):

    def create_user(self, username, name, email, password):
        if not username:
            raise ValueError('Debe de ingresar un nombre de usuario')    
        email = self.normalize_email(email)
        usuario = self.model(username=username, name=name, email=email, is_active=False)
        usuario.set_password(password)
        usuario.is_active=False
        usuario.save()

    def create_superuser(self, username, name, email, is_active, password):
        if not username:
            raise TypeError('Debe de ingresar un nombre de usuario')    
        email = self.normalize_email(email)
        usuario = self.model(username=username, name=name, email=email, is_active=is_active)
        usuario.set_password(password)
        usuario.is_active=False
        usuario.save()


class User(AbstractUser):

    def __str__(self):
        return "{} {} ".format(self.first_name, self.last_name )