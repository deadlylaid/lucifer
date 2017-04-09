from django.db.models.signals import post_save
from django.dispatch import receiver

from users.models import User
from game.characters.models import Character, Status, Inventory
from game.items.models import Item


@receiver(post_save, sender=Character)
def character_post_save(sender, instance, created, **kwargs):

    if created:
        # 케릭터 생성 시 능력치와, 기본 아이템이 인벤토리에 저장됨

        if instance.job == 'sorceress':

            Status.objects.create(
                    character_set=instance, experience=1,
                    max_health=150,
                    health=150,
                    mana=100,
                    max_mana=100, strong=8, dexterity=8,
                    intelligence=10,
                    defence_point=6,
                    accuracy=48,
                    evasion=21,
                    )

        elif instance.job == 'barbarian':

            Status.objects.create(
                    character_set=instance,
                    experience=1,
                    max_health=170,
                    health=170,
                    max_mana=80,
                    mana=80,
                    strong=10,
                    dexterity=8,
                    intelligence=8,
                    defence_point=7,
                    accuracy=38,
                    evasion=6,
                    )

        elif instance.job == 'paladin':

            Status.objects.create(
                    character_set=instance,
                    experience=1,
                    max_health=160,
                    health=160,
                    max_mana=90,
                    mana=90,
                    strong=9,
                    dexterity=9,
                    intelligence=8,
                    defence_point=8,
                    accuracy=42,
                    evasion=16,
                    )

        instance.user.has_character = True
        instance.user.save()

        item, is_true = Item.objects.get_or_create(
                name='빨간물약',
                type_is='potion',
                image_name='healthPotion1',
                )

        Inventory.objects.create(
                character=instance,
                item=item,
                )
