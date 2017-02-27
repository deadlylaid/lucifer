from rest_framework.generics import ListAPIView
from game.skills.models import Skill
from game.skills.api.serializers import SkillSerializer


class SkillListAPIView(ListAPIView):

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
