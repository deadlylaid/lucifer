from django.db import models


class NPC(models.Model):

    name = models.CharField(
            max_length=20,
            )

    SELECT_ROLE = (
            ('퀘스트', '퀘스트용NPC'),
            ('서브퀘스트', '서브퀘스트용NPC'),
            ('반복퀘스트', '반복퀘스트용NPC'),
            ('상점', '상점용NPC'),
            )

    role = models.CharField(
            max_length=5,
            choices=SELECT_ROLE,
            )

    def __str__(self):
        return self.name
