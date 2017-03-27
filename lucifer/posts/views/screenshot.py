from django.views.generic import ListView, DetailView
from django.shortcuts import render

from posts.models import ScreenShot


class ScreenShotListView(ListView):

    model = ScreenShot
    template_name = "posts/screenshot.html"
    context_object_name = "screenshots"


class ScreenShotDetailView(DetailView):

    model = ScreenShot
    template_name = "posts/screenshot_detail.html"
    context_object_name = "screenshot"
