from django.db.models.signals import post_save
from django.dispatch import receiver

from game.characters.models import Character, Status


@receiver(post_save, sender=Character)
def character_post_save(sender, instance, created, **kwargs):

    if created:
        Status.objects.create(
                character_set=instance,
                )
