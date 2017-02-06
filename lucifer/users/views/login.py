from django.views.generic import View
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse


class LogIn(View):

    def get(self, request):

        return render(
                request,
                "users/login.html",
                context={},
                )

    def post(self, request):

        get_username = request.POST.get('username')
        get_password = request.POST.get('password')

        user = authenticate(
                username=get_username,
                password=get_password,
                )

        if user:
            login(request, user)
            return redirect(
                    reverse(
                        "home"
                        )
                    )
        else:
            return redirect(
                    reverse(
                        "home"
                        )
                    )
