from rest_framework import serializers
from game.characters.models import QuickSlot, Inventory, LearnedSkill


class QuickSlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuickSlot
        fields = (
                'potion_name',
                'count',
                )
