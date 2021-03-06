from django.views.generic import CreateView
from posts.models import QNA
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin


class QnaCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):

    login_url = '/'

    model = QNA
    fields = [
            'title',
            'content',
            ]
    template_name = "posts/qna.html"

    def form_valid(self, form):

        form.instance.user = self.request.user
        return super(QnaCreateView, self).form_valid(form)

    success_message = '접수되었습니다.'
