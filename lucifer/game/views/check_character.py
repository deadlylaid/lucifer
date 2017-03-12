from django.views.generic import View
from django.shortcuts import redirect
from django.core.urlresolvers import reverse


class CheckCharacter(View):

    def get(self, request):

        if request.user.has_character is True:
            return redirect(reverse("gamestart"))

        else:
            return redirect(reverse("createcharacter"))
