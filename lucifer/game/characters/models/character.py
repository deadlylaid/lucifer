from django.db import models
from django.conf import settings
from game.quests.models import Quest


class Character(models.Model):

    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            )

    nickname = models.CharField(
            max_length=8,
            )

    level = models.IntegerField(
            default=1,
            )

    JOB_CHOICE = (
            ('나이트', '나이트'),
            ('야만전사', '야만전사'),
            ('팔라딘', '팔라딘'),
            )

    job = models.CharField(
            max_length=4,
            choices=JOB_CHOICE,
            null=True,
            blank=True,
            )

    # 어떤 퀘스트를 완료했는지
    complete_quest_set = models.ManyToManyField(
            Quest,
            )