from django.db import models
from .character import Character


class Position(models.Model):

    character_set = models.OneToOneField(
            Character,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            primary_key=True,
            )

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
