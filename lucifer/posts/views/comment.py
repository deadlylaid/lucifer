from django.views.generic import CreateView
from django.views.decorators.http import require_POST
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.decorators import method_decorator
from django.core.urlresolvers import reverse

from posts.models.freeboard import FreeBoard
from posts.models.comment import Comment


@method_decorator(require_POST, name='dispatch')
class CommentCreateView(LoginRequiredMixin, CreateView):

    login_url = '/login/'
    model = Comment
    fields = [
            'contents',
            ]

    def form_valid(self, form):

        user = self.request.user
        freeboard = FreeBoard.objects.get(
                 pk=self.kwargs.get('pk')
                )

        form.instance.freeboard = freeboard
        form.instance.user = user

        return super(CommentCreateView, self).form_valid(form)
