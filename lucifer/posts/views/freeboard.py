from django.views.generic import CreateView, ListView, DetailView
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.contrib.auth.mixins import LoginRequiredMixin

from posts.forms import PostForm
from posts.models.freeboard import FreeBoard


class CreateFreeBoard(LoginRequiredMixin, CreateView):

    login_url = '/login/'
    template_name = 'posts/freecreate.html'

    form_class = PostForm

    def form_valid(self, form):

        form.instance.user = self.request.user
        title = form.instance.title
        content = form.instance.content

        return super(CreateFreeBoard, self).form_valid(form)


class ListFreeBoard(ListView):

    model = FreeBoard
    template_name = "posts/free_list.html"
    context_object_name = "freeboards"


class DetailFreeBoard(DetailView):

    model = FreeBoard
    template_name = "posts/free_detail.html"
    context_object_name = "freeboard"
