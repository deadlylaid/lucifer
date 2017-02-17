from django.views.generic import View, ListView
from django.shortcuts import render
from posts.forms import PostForm
from posts.models.freeboard import FreeBoard
from django.contrib.auth.mixins import LoginRequiredMixin


class CreateFreeBoard(LoginRequiredMixin, View):

    login_url = '/login/'

    def get(self, request):

        form = PostForm()

        return render(
                request,
                "posts/freecreate.html",
                context={
                    'form': form
                    }
                )

    def post(self, request, *args, **kwargs):

        user = request.user
        title = request.POST.get('title')
        content = request.POST.get('content')

        created_post = FreeBoard.objects.create(
                user=user,
                title=title,
                content=content,
                )

        return render(
                request,
                "home.html",
                context={},
                )


class ListFreeBoard(ListView):

    model = FreeBoard
    template_name = "posts/free_list.html"
    context_object_name = "freeboards"
