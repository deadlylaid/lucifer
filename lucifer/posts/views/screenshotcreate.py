from django.views.generic import View
from django.shortcuts import render


class ScreenShotCreate(View):

    def get(self, request):
        return render(
                request,
                "posts/screenshot_create.html",
                context={}
                )
