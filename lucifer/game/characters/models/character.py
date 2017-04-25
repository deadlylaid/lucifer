from django.db import models
from django.conf import settings
from game.quests.models import Quest


class Character(models.Model):

    user = models.OneToOneField(
            settings.AUTH_USER_MODEL,
            )

    nickname = models.CharField(
            max_length=8,
            )

    level = models.IntegerField(
            default=1,
            )

    JOB_CHOICE = (
            ('sorceress', '소서리스'),
            ('barbarian', '바바리안'),
            ('paladin', '팔라딘'),
            )

    job = models.CharField(
            max_length=4,
            choices=JOB_CHOICE,
            null=True,
            blank=True,
            )

    gold = models.IntegerField(
            default=3000,
            )

    def __str__(self):
        return self.nickname
