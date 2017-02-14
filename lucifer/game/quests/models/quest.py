from django.db import models
from game.npc.models import NPC


class Quest(models.Model):

    npc = models.ForeignKey(
            NPC,
            )

    title = models.CharField(
            max_length=50,
            )

    contents = models.TextField(
            max_length=255,
            )

    ex_reward = models.IntegerField(
            )

    gold_reward = models.IntegerField(
            )
