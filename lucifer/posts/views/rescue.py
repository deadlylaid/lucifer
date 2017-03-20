from django.views.generic import View
from django.shortcuts import render


class Rescue(View):

    def get(self, request):
        return render(
            request,
            "posts/rescue.html",
            context={}
        )
