from django.db import models
from users.models import User

from django.core.urlresolvers import reverse


class QNA(models.Model):

    user = models.ForeignKey(
            User,
            )

    title = models.CharField(
            max_length=20,
            )

    content = models.TextField(
            max_length=255,
            )

    def get_absolute_url(self):
        return reverse(
                "qna",
                )

    def __str__(self):
        return self.title
