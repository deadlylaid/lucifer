from django.views.generic import View
from django.shortcuts import render


class BugNotice(View):

    def get(self, request):
        return render(
                request,
                "posts/bugnotice.html",
                context={}
                )