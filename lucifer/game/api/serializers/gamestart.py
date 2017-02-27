from rest_framework import serializers
from game.characters.models import Character
from game.characters.api.serializers import StatusSerializer


class GameStartSerializer(serializers.ModelSerializer):

    status = StatusSerializer()

    class Meta:

        model = Character
        fields = (
                'nickname',
                'level',
                'job',
                'complete_quest_set',

                'status',
                )
