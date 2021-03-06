from rest_framework import serializers
from game.characters.models import Equipment


class EquipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equipment
        fields = (
                'item_name',
                'body_parts',
                )
