from django.db import models


class Skill(models.Model):

    job = models.CharField(
            max_length=10,
            )

    name = models.CharField(
            max_length=30,
            )

    damage = models.IntegerField(
            default=0,
            )

    limit_level = models.IntegerField(
            default=1,
            )

    def __str__(self):
        return self.name
