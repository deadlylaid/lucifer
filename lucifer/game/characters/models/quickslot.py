from django.db import models
from game.characters.models import Character, Inventory, LearnedSkill


class QuickSlot(models.Model):

    character = models.ForeignKey(
            Character,
            # 상위 objects 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    potion_name = models.CharField(
            max_length=20,
            )

    count = models.IntegerField(
            default=10,
            )
