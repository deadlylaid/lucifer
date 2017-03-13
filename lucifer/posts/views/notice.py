from django.views.generic import ListView
from django.shortcuts import render

from posts.models import Notice


class ListNotice(ListView):

    model = Notice
    template_name = "posts/notice_list.html"
    context_object_name = "notices"
