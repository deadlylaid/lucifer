from django.views.generic import View, ListView
from django.shortcuts import render
from posts.forms import PostForm
from posts.models.freeboard import FreeBoard


class CreateFreeBoard(View):

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

        title = request.POST.get('title')
        content = request.POST.get('content')

        return render(
                request,
                "home.html",
                context={},
                )


class ListFreeBoard(ListView):
    pass
