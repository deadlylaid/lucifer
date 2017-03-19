from django.views.generic import View
from django.shortcuts import render

class JobIntro(View):

	def get(self, request):
		return render(
			request,
			"posts/gameintro_job.html",
			context={}
		)
