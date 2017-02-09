from django.db import models
from django.conf import settings


class FreeBoard(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    title = models.CharField(
            max_length=20,
            )

    content = models.TextField(
            max_length=255,
            )
