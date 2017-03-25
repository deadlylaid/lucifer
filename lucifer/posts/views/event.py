from django.views.generic import ListView, DetailView
from django.shortcuts import render

from posts.models import Event


class ListEvent(ListView):

    model = Event
    template_name = "posts/event_list.html"
    context_object_name = "events"

    # 최신 등록된 게시글 순서대로 출력
    def get_ordering(self):
        self.ordering = '-created_at'
        return self.ordering


class EventDetailView(DetailView):

    model = Event
    template_name = "posts/event_detail.html"
    context_object_name = "event"
