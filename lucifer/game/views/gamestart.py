from django.views.generic import View
from django.shortcuts import render


class GameStartView(View):

    def get(self, request):

        return render(
            request,
            'game/gamestart.html',
            context={},
            )
