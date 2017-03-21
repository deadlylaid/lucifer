from django.views.generic import View
from django.shortcuts import render


class ScreenShotDetail(View):

    def get(self, request):
        return render(
                request,
                "posts/screenshot_detail.html",
                context={}
                )
