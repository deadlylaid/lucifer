from django.db import models
from game.characters.models import Character, Inventory


class Equipment(models.Model):

    character = models.ForeignKey(
            Character,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    body_parts = models.CharField(
            max_length=10,
            )
