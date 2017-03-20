from django.views.generic import View
from django.shortcuts import render


class Policy(View):

    def get(self, request):
        return render(
            request,
            "posts/policy.html",
            context={}
        )
