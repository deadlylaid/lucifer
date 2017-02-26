from rest_framework import serializers
from game.characters.models import Character
from .status_serializer import StatusSerializer


class CharacterSerializer(serializers.ModelSerializer):

    status = StatusSerializer(read_only=True)

    class Meta:
        model = Character
        fields = (
                'nickname',
                'level',
                'job',
                'complete_quest_set',

                'status',
                )
