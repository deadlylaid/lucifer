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

    health = models.IntegerField(
            default=1,
            )

    experience = models.IntegerField(
            default=0,
            )

    # 몬스터가 드랍하는 아이템은 랜덤
    drop_items_set = models.ManyToManyField(
            Item,
            )
