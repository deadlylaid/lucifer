from django.db import models
from users.models import User


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

    created_at = models.DateTimeField(
            auto_now_add=True,
            )
