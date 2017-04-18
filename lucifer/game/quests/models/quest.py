from django.db import models
from game.npc.models import NPC


class Quest(models.Model):

    title = models.CharField(
            max_length=50,
            )

    ex_reward = models.IntegerField(
            blank=True,
            null=True,
            )

    gold_reward = models.IntegerField(
            blank=True,
            null=True,
            )

    def __str__(self):
        return self.title
