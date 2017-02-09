from django.views.generic import View
from django.shortcuts import render
from posts.forms import PostForm


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

    def post(self, request):
        pass
