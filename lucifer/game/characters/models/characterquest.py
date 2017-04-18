from django.db import models
from game.quests.models import Quest
from game.characters.models import Character


class CharacterQuest(models.Model):

    quest = models.ForeignKey(
            Quest,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    character = models.ForeignKey(
            Character,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    advanced = models.IntegerField(
            default=0,
            )

    goal = models.IntegerField(
            default=0,
            )

    is_completed = models.BooleanField(
            default=False,
            )
