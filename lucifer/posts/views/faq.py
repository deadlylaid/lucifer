from django.views.generic import View
from django.shortcuts import render


class Faq(View):

    def get(self, request):
        return render(
                request,
                "posts/faq.html",
                context={}
                )