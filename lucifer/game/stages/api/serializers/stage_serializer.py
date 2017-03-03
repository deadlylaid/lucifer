from rest_framework import serializers
from game.stages.models import Stage


class StageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stage
        fields = '__all__'
