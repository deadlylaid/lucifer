from django.db import models
from game.characters.models import Character
from game.skills.models import Skill


class LearnedSkill(models.Model):

    character = models.ForeignKey(
            Character,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    skill = models.ForeignKey(
            Skill,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    damage = models.IntegerField(
            default=0,
            )

    def __str__(self):
        return self.skill.name
