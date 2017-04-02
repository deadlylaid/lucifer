from django.contrib import admin
from game.items.models import Item


@admin.register(Item)
class ItemModelAdmin(admin.ModelAdmin):

    list_display = admin.ModelAdmin.list_display + (
            'name',
            'image_name',
            'type_is',
            'heal',
            'attack_point',
            'defence_point',
            'price',
            )
