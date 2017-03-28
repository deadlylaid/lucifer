from rest_framework import serializers
from game.characters.models import Status


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = (
                'experience',
                'health',
                'mana',
                'attack_point',
                'defence_point',
                'strong',
                'dexterity',
                'intelligence',
                'accuracy',
                'evasion',
                'skill_point',
                )
