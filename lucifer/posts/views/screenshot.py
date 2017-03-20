from django.views.generic import View
from django.shortcuts import render


class ScreenShot(View):

    def get(self, request):
        return render(
                request,
                "posts/screenshot.html",
                context={}
                )