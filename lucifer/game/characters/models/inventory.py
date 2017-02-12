from django.db import models
from game.characters.models import Character
from game.items.models import Item


class Inventory(models.Model):

    character = models.ForeignKey(
            Character,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    item = models.ForeignKey(
            Item,
            # 상위 object 삭제시 같이 삭제됨
            on_delete=models.CASCADE,
            )

    count = models.IntegerField(
            default=1,
            )

    def __str__(self):
        return self.item.name
