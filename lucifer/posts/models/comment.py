from django.db import models
from .freeboard import FreeBoard
from django.conf import settings
from django.core.urlresolvers import reverse


class Comment(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    freeboard = models.ForeignKey(
            "FreeBoard",
            )

    contents = models.TextField(
            max_length=255,
            )

    created_at = models.DateTimeField(
            auto_now_add=True,
            )

    updated_at = models.DateTimeField(
            auto_now=True,
            )

    def get_absolute_url(self):

        return reverse(
                'free_detail',
                kwargs={
                    'pk': self.freeboard.pk,
                    },
                )
