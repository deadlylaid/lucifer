from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    name = models.CharField(
            max_length=20,
            )

    phonenumber = models.CharField(
            max_length=11,
            )

    has_character = models.BooleanField(
            default=False,
            )
