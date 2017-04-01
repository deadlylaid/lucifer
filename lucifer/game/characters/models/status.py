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

    max_health = models.IntegerField(
            default=100,
            )

    health = models.IntegerField(
            default=100,
            )

    max_mana = models.IntegerField(
            default=50,
            )

    mana = models.IntegerField(
            default=50,
            )

    attack_point = models.IntegerField(
            default=1,
            )

    defence_point = models.IntegerField(
            default=10,
            )

    strong = models.IntegerField(
            default=10,
            )

    dexterity = models.IntegerField(
            default=10,
            )

    intelligence = models.IntegerField(
            default=10,
            )

    accuracy = models.IntegerField(
            default=0,
            )

    evasion = models.IntegerField(
            default=0,
            )

    skill_point = models.IntegerField(
            default=0,
            )

    def __str__(self):
        return "%s 의 능력치" % (self.character_set.nickname)
