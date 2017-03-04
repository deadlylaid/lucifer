from rest_framework import serializers
from game.characters.models import Inventory
from game.items.models import Item

from game.items.api.serializers import ItemSerializer


class InventorySerializer(serializers.ModelSerializer):

    item_name = serializers.CharField(source='item.name')

    class Meta:
        model = Inventory
        fields = (
                'item_name',
                'count',
                )
