from rest_framework import serializers
from game.characters.models import Status


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = (
                'health',
                'mana',
                'attack_point',
                'defence_point',
                'dexterity',
                'intelligence',
                'skill_point',
                )
