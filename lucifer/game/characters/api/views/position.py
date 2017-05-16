from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status

from game.characters.api.serializers import StatusSerializer
from users.models import User
from game.characters.models import Position
from game.characters.models import Character


# statusAPI 채크용 뷰
class PositionAPIView(ListAPIView):

    serializer_class = StatusSerializer

    def get_queryset(self):

        user = self.request.user
        character = Character.objects.get(user=user)
        return Position.objects.filter(character_set=character)
