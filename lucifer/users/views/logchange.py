from django.views.generic import View
from django.shortcuts import render


class LogChange(View):

    def get(self, request):
        return render(
            request,
            "users/logchange.html",
            context={}
        )
