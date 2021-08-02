# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from app import views
from rest_framework.routers import SimpleRouter

from .views import (FamiliaViewSet, MembroViewSet)
from . import views


router = SimpleRouter()
router.register('familias', FamiliaViewSet)
router.register('membros', MembroViewSet)

urlpatterns = [

    # The home page
    path('', views.index, name='home'),

    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),


]
