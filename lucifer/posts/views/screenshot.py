from django.views.generic import ListView
from django.shortcuts import render

from posts.models import ScreenShot


class ScreenShot(ListView):

    model = ScreenShot
    template_name = "posts/screenshot.html"
