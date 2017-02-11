from django.db import models


class Stage(models.Model):

    name = models.CharField(
            max_length=20,
            )

    position = models.CharField(
            max_length=20,
            )
