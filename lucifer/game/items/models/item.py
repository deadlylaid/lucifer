from django.db import models


class Item(models.Model):

    name = models.CharField(
            max_length=20,
            )

    type_is = models.CharField(
            max_length=20,
            )

    attack_point = models.IntegerField(
            default=0,
            )

    defence_point = models.IntegerField(
            default=0,
            )

    heal = models.IntegerField(
            default=0,
            )

    limited_job = models.CharField(
            max_length=10,
            default='public',
            )

    price = models.IntegerField(
            default=1,
            )

    body_parts = models.CharField(
            max_length=4,
            default='0',
            )
