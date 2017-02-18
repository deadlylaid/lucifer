from django.views.generic import CreateView
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from posts.models import Answer, FreeBoard


@method_decorator(require_POST, name='dispatch')
class CreateAnswer(LoginRequiredMixin, CreateView):

    login_url = '/login/'
    model = Answer

    fields = [
            'contents',
            ]

    def form_valid(self, form):

        freeboard = FreeBoard.objects.get(
                pk=self.kwargs.get('pk'),
                )

        form.instance.freeboard = freeboard
        form.instance.user = self.request.user

        return super(CreateAnswer, self).form_valid(form)

    def get_success_url(self):
        freeboard = FreeBoard.objects.get(
                pk=self.kwargs.get('pk')
                )

        return freeboard.get_absolute_url()
