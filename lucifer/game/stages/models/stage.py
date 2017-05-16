from django.db import models


class Stage(models.Model):

    stage = models.CharField(
            default=1,
            max_length=20,
            )

    position_x = models.CharField(
            default=875,
            max_length=20,
            )

    position_y = models.CharField(
            default=1637,
            max_length=20,
            )
