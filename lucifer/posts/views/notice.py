from django.views.generic import ListView, DetailView
from django.shortcuts import render

from posts.models import Notice


class ListNotice(ListView):

    model = Notice
    template_name = "posts/notice_list.html"
    context_object_name = "notices"


class NoticeDetailView(DetailView):

    model = Notice
    template_name = "posts/notice_detail.html"
    context_object_name = "notice"
