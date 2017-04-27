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

    def put(self, request):

        character = self.request.user.character
        index = int(self.request.data.get('index'))

        character_quest = CharacterQuest.objects.filter(character=character)

        selected_quest = character_quest[index]
        selected_quest.is_completed = True
        selected_quest.save()

        return Response(status=status.HTTP_200_OK)
