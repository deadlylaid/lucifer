from django.views.generic import ListView
from django.shortcuts import render

from posts.models import Event


class ListEvent(ListView):

    model = Event
    template_name = "posts/event_list.html"
    context_object_name = "events"
