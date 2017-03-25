from django.views.generic import View
from django.shortcuts import render
from django.core.paginator import Paginator

from posts.models import Notice, Event, FreeBoard


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

        freeboard = Paginator(
                FreeBoard.objects.order_by('-created_at'),
                20,
                )

        showed_notices = notices.page(1)
        showed_events = events.page(1)
        showed_freeboard = freeboard.page(1)

        context = {
                'notices': showed_notices,
                'events': showed_events,
                'freeboards': showed_freeboard,
                }

        return render(
                request,
                "home.html",
                context,
                )
