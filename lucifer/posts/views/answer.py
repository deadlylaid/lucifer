from django.views.generic import CreateView
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from posts.models import Answer, FreeBoard


def answer(request, pk):

    freeboard = FreeBoard.objects.get(pk=pk)

    freeboard.answer_set.create(
            user=request.user,
            contents=request.POST.get("contents")
            )

    return redirect(
            reverse(
                "free_detail",
                kwargs={
                    "pk": freeboard.id
                    },
                )
            )
