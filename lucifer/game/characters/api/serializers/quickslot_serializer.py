from rest_framework import serializers
from game.characters.models import QuickSlot, Inventory, LearnedSkill


class QuickSlotSerializer(serializers.ModelSerializer):

    skill_name = serializers.CharField(source='learnedskill.skill.name')

    class Meta:
        model = QuickSlot
        fields = (
                'skill_name',
                'macro',
                )
