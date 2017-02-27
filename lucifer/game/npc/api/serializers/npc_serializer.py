from rest_framework import serializers
from game.npc.models import NPC


class NPCSerializer(serializers.ModelSerializer):

    class Meta:
        model = NPC
        fields = '__all__'
