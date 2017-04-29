from rest_framework import serializers
from game.characters.models import LearnedSkill
from game.skills.models import Skill


class LearnedSkillSerializer(serializers.ModelSerializer):

    skill_name = serializers.CharField(source='skill.name')

    class Meta:
        model = LearnedSkill
        fields = (
                'skill_name',
                'demage',
                )
