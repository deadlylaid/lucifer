from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from game.characters.models import LearnedSkill


class LearnedSkillAPIView(APIView):

    serializer_class = LearnedSkill

    def put(self, request):
        return Response(status=status.HTTP_200_OK)
