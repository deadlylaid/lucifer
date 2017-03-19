from django.views.generic import CreateView
from posts.models import QNA


class QnaCreateView(CreateView):

    model = QNA
    fields = [
            'title',
            'content',
            ]
    template_name = "posts/qna.html"

    def form_valid(self, form):

        form.instance.user = self.request.user
        return super(QnaCreateView, self).form_valid(form)
