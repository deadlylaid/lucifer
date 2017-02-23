from django.views.generic import View
from django.shortcuts import render


class CharacterDetail(View):

    def get(self, request):
        return render(
                request,
                'characters/character.html',
                context={},
                )
