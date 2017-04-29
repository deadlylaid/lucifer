from rest_framework import serializers
from game.characters.models import LearnedSkill
from game.skills.models import Skill


class LearnedSkillSerializer(serializers.ModelSerializer):

    skill_name = serializers.CharField(source='skill.name')
    limit_level = serializers.IntegerField(source='skill.limit_level')

    class Meta:
        model = LearnedSkill
        fields = (
                'skill_name',
                'limit_level',
                'damage',
                )
