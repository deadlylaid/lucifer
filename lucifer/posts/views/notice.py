from django.views.generic import View
from django.shortcuts import render


class ListNotice(View):

    def get(self, request):
        return render(
                request,
                "posts/notice_list.html",
                context={},
                )
