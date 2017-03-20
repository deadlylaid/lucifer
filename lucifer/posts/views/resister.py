from django.views.generic import View
from django.shortcuts import render


class Resister(View):

    def get(self, request):
        return render(
            request,
            "posts/resister.html",
            context={}
        )
