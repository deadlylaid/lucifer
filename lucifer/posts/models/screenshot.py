from django.db import models
from django.conf import settings


class ScreenShot(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    title = models.CharField(
            max_length=25,
            )

    contents = models.TextField(
            max_length=255,
            )

    image = models.ImageField(
            )

    created_at = models.DateTimeField(
            auto_now_add=True,
            )

    def __str__(self):
        return self.title
