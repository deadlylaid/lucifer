from rest_framework import serializers
from game.characters.models import CharacterQuest


class CharacterQuestSerializer(serializers.ModelSerializer):

    title = serializers.CharField(source='quest.title')
    ex_reward = serializers.IntegerField(source='quest.ex_reward')
    gold_reward = serializers.IntegerField(source='quest.gold_reward')

    class Meta:
        model = CharacterQuest
        fields = (
                'title',
                'ex_reward',
                'gold_reward',
                'advanced',
                'goal',
                'is_completed',
                )
