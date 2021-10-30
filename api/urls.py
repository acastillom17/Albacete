from django.urls import path, include
from api.viewsets.usuario import *
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from django.conf.urls.static import  static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'usuarios', UserViewset)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls'))
]
