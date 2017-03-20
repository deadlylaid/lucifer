from django.views.generic import View
from django.shortcuts import render


class StoryIntro(View):

    def get(self, request):
        return render(
                request,
                "posts/gameintro_story.html",
                context={}
                )
