from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from game.characters.models import CharacterQuest
from game.characters.api.serializers import CharacterQuestSerializer


class CharacterQuestAPIView(ListAPIView):

    serializer_class = CharacterQuestSerializer

    def get_queryset(self):

        character = self.request.user.character
        return CharacterQuest.objects.filter(character=character)

    def post(self, request):

        character = self.request.user.character
        index = int(self.request.data.get('index'))

        character_quest = CharacterQuest.objects.filter(character=character)

        character_quest[index].is_completed = True
        character_quest[index].save()

        return Response(status=status.HTTP_200_OK)
