from django.db import models
from game.characters.models import Character


class Status(models.Model):

    character_set = models.OneToOneField(
            Character,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            primary_key=True,
            )

    experience = models.IntegerField(
            default=0,
            )

    health = models.IntegerField(
            default=100,
            )

    mana = models.IntegerField(
            default=50,
            )

    attack_point = models.IntegerField(
            default=10,
            )

    defence_point = models.IntegerField(
            default=10,
            )

    dexterity = models.IntegerField(
            default=10,
            )

    intelligence = models.IntegerField(
            default=10,
            )

    skill_point = models.IntegerField(
            default=0,
            )
