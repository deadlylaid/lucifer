from rest_framework import serializers
from game.characters.models import Position


class PositionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Position
        fields = (
                'stage',
                'position_x',
                'position_y',
                )
