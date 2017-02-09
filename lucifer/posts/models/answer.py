from django.db import models
from .freeboard import FreeBoard
from django.conf import settings


class Answer(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    freeboard = models.ForeignKey(
            "FreeBoard",
            )

    contents = models.TextField(
            max_length=255,
            )
