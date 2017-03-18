from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status

from game.characters.api.serializers import StatusSerializer
from users.models import User
from game.characters.models import Status
from game.characters.models import Character


# statusAPI 채크용 뷰
class StatusAPIView(ListAPIView):

    serializer_class = StatusSerializer

    def get_queryset(self):

        user = self.request.user
        character = Character.objects.get(user=user)
        return Status.objects.filter(character_set=character)

    def put(self, request):

        nickname = self.request.data["nickname"]
        level = self.request.data["level"]
        job = self.request.data["job"]
        attack_point = self.request.data["attack_point"]
        defence_point = self.request.data["defence_point"]
        health = self.request.data["health"]
        mana = self.request.data["mana"]
        dexterity = self.request.data["dexterity"]
        intelligence = self.request.data["intelligence"]

        login_user = self.request.user

        character = Character.objects.get(user=login_user)
        user = User.objects.get(username=login_user.username)

        character.status.attack_point = attack_point
        character.status.defence_point = defence_point
        character.status.health = health
        character.status.mana = mana
        character.status.dexterity = dexterity
        character.status.intelligence = intelligence
        character.status.save()

        serializer = StatusSerializer(character.status)

        if StatusSerializer(data=serializer.data):
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQEUST)
