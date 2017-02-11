from django.db import models
from game.items.models import Item


class Monster(models.Model):

    name = models.CharField(
            max_length=10,
            )

    attack_point = models.IntegerField(
            default=0,
            )

    defence_point = models.IntegerField(
            default=0,
            )

    health_point = models.IntegerField(
            default=1,
            )

    experience = models.IntegerField(
            default=0,
            )

    drop_item = models.ForeignKey(
            Item,
            )
