from django.views.generic import View
from django.shortcuts import render

from game.characters.models import Character


class RankingView(View):

    def get(self, request):

        characters = Character.objects.order_by('status__attack_point')[:10]

        context = {
                'characters': characters,
                }

        return render(
                request,
                "posts/ranking.html",
                context,
                )
