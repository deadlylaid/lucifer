from django.views.generic import ListView, DetailView
from django.shortcuts import render

from posts.models import Notice


class ListNotice(ListView):

    model = Notice
    template_name = "posts/notice_list.html"
    context_object_name = "notices"

    # 최신 등록된 게시글 순서대로 출력
    def get_ordering(self):
        self.ordering = '-created_at'
        return self.ordering


class NoticeDetailView(DetailView):

    model = Notice
    template_name = "posts/notice_detail.html"
    context_object_name = "notice"
