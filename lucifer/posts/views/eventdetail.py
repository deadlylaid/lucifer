from django.views.generic import View
from django.shortcuts import render


class EventDetail(View):

    def get(self, request):
        return render(
                request,
                "posts/event_list_detail.html",
                context={}
                )
