from django.db import models
from game.characters.models import Character, Inventory, LearnedSkill


class QuickSlot(models.Model):

    character = models.ForeignKey(
            Character,
            # 상위 objects 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    inventory = models.ForeignKey(
            Inventory,
            # 상위 objects 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            # 퀵슬롯 마다 아이템, 스킬 중 하나만 등록이 가능하다
            blank=True,
            null=True,
            )

    LearnedSkill = models.ForeignKey(
            LearnedSkill,
            # 상위 objects 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            # 퀵슬롯 마다 아이템, 스킬 중 하나만 등록이 가능하다
            blank=True,
            null=True,
            )

    # 어떤 키를 눌러야 작동하는지를 저장하기 위한 column
    macro = models.CharField(
            max_length=1,
            null=True,
            blank=True,
            )
