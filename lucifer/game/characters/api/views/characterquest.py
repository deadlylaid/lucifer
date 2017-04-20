from rest_framework.generics import ListAPIView
from game.characters.models import CharacterQuest
from game.characters.api.serializers import CharacterQuestSerializer


class CharacterQuestAPIView(ListAPIView):

    serializer_class = CharacterQuestSerializer

    def get_queryset(self):

        character = self.request.user.character
        return CharacterQuest.objects.filter(character=character)
