from django.views.generic import View
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse

from game.characters.models import Character


class CreateCharacter(View):

    def get(self, request):
        return render(
                request,
                "game/createcharacter.html",
                context={}
                )

    def post(self, request):

        nickname = request.POST.get('nickname')
        selected_job = request.POST.get('characterjob')
        user = request.user

        Character.objects.create(
                user=user,
                nickname=nickname,
                job=selected_job,
                )
        return redirect(reverse("gamestart"))
