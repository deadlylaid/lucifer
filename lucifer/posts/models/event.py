from django.db import models
from django.conf import settings
from datetime import datetime, timedelta

from versatileimagefield.fields import VersatileImageField


class Event(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    title = models.CharField(
            max_length=50,
            )

    contents = models.TextField(
            max_length=255,
            )

    created_at = models.DateTimeField(
            auto_now_add=True,
            )

    deadline_at = models.DateTimeField(
            default=datetime.now()+timedelta(days=30),
            )

    event_image = VersatileImageField(
            blank=True,
            null=True,
            )

    @property
    def is_end(self):
        if self.created_at > self.deadline_at:
            return True
        return False
