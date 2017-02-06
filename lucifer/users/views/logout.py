from django.views.generic import View
from django.contrib.auth import logout

from django.core.urlresolvers import reverse
from django.shortcuts import redirect


class LogOut(View):

    def get(self, request):

        logout(request)

        return redirect(
                reverse(
                    'home'
                    )
                )
