from django.views.generic import View
from django.shortcuts import render


class CreateCharacter(View):

    def get(self, request):
        return render(
                request,
                "game/createcharacter.html",
                context={}
                )
