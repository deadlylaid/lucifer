from django.db import models
from django.conf import settings


class Character(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    nickname = models.CharField(
            max_length=8,
            )

    level = models.IntegerField(
            default=1,
            )

    job = models.CharField(
            max_length=10,
            null=True,
            blank=True,
            )
