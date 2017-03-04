from django.db.models.signals import post_save
from django.dispatch import receiver

from game.characters.models import Character, Status, Inventory
from game.items.models import Item


@receiver(post_save, sender=Character)
def character_post_save(sender, instance, created, **kwargs):

    if created:
        # 케릭터 생성 시 능력치와, 기본 아이템이 인벤토리에 저장됨
        Status.objects.create(
                character_set=instance,
                )

        Inventory.objects.create(
                character=instance,
                item=Item.objects.first(),
                )
