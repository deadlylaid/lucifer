from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse
from django.core.paginator import Paginator


from posts.models import ScreenShot


class ScreenShotListView(ListView):

    model = ScreenShot
    template_name = "posts/screenshot.html"
    paged_by = 9

    # context를 받아서 커스터마이징하기 위함
    def get_context_data(self, **kwargs):
        context = super(ScreenShotListView, self).get_context_data(**kwargs)
        screenshot_objects = ScreenShot.objects.all()
        paginator = Paginator(screenshot_objects, self.paged_by)

        page = self.request.GET.get('page', 1)
        screenshots = paginator.page(page)
        context['screenshots'] = screenshots
        return context


class ScreenShotDetailView(DetailView):

    model = ScreenShot
    template_name = "posts/screenshot_detail.html"
    context_object_name = "screenshot"


class ScreenShotCreateView(LoginRequiredMixin, View):

    login_url = '/'

    def get(self, request):

        return render(
                request,
                "posts/screenshot_create.html",
                context={},
                )

    def post(self, request, *args, **kwargs):
        logined_user = self.request.user
        title = request.POST.get('title')
        contents = request.POST.get('contents')
        image = request.FILES.get('image')

        ScreenShot.objects.create(
                user=logined_user,
                title=title,
                contents=contents,
                image=image,
                )

        return redirect(
                reverse(
                    "screenshot"
                    )
                )
