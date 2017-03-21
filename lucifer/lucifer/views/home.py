from django.views.generic import View
from django.shortcuts import render
from django.core.paginator import Paginator

from posts.models import Notice, Event


class Home(View):

    def get(self, request):

        notices = Paginator(
                Notice.objects.order_by('-created_at'),
                5,
                )

        events = Paginator(
                Event.objects.order_by('-created_at'),
                5,
                )

        context = {
                'notices': notices.object_list,
                'events': events.object_list,
                }

        return render(
                request,
                "home.html",
                context,
                )
