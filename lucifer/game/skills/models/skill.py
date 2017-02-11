from django.db import models


class Skill(models.Model):

    job = models.CharField(
            max_length=10,
            )

    name = models.CharField(
            max_length=30,
            )

    demage = models.IntegerField(
            default=0,
            )

    heal = models.IntegerField(
            default=0,
            )

    reange = models.IntegerField(
            default=0,
            )

    need_point = models.IntegerField(
            default=1,
            )

    limit_level = models.IntegerField(
            default=1,
            )
