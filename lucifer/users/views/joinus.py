from django.views.generic import View
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.core.urlresolvers import reverse

from users.models import User


class JoinUs(View):

    def get(self, request):

        return render(
                request,
                "users/joinus.html",
                context={},
                )

    def post(self, request):

        get_username = request.POST.get('username')
        get_password = request.POST.get('password')
        get_password_check = request.POST.get('password_check')
        get_email = request.POST.get('email')

        if get_password == get_password_check:

            created_user = User.objects.create_user(
                    username=get_username,
                    password=get_password,
                    email=get_email,
                    )

            created_user = authenticate(
                    username=get_username,
                    password=get_password,
                    )

            login(request, created_user)

            return redirect(
                    reverse(
                        'home'
                        )
                    )

        else:
            return redirect(
                    reverse(
                        'home'
                        )
                    )
