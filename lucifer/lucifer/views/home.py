from django.views.generic import View
from django.shortcuts import render
from django.core.paginator import Paginator
from django.contrib import messages

from posts.models import Notice, Event, FreeBoard
from game.characters.models import Character


class Home(View):

    def get(self, request):

        if self.request.GET.get('next'):
            messages.add_message(
                    request,
                    messages.WARNING,
                    '로그인을 해야 이용할 수 있는 서비스입니다',
                    )

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

        ranking = Paginator(
                Character.objects.order_by('-level'),
                10,
                )

        showed_notices = notices.page(1)
        showed_events = events.page(1)
        showed_freeboard = freeboard.page(1)
        showed_ranking = ranking.page(1)

        context = {
                'notices': showed_notices,
                'events': showed_events,
                'freeboards': showed_freeboard,
                'characters': showed_ranking,
                }

        return render(
                request,
                "home.html",
                context,
                )
