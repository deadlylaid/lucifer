from rest_framework.generics import ListAPIView

from game.characters.api.serializers import CharacterSerializer
from users.models import User
from game.characters.models import Character


class CharacterAPIView(ListAPIView):

    serializer_class = CharacterSerializer

    def get_queryset(self):

        user = self.request.user
        return Character.objects.filter(user=user)

    def put(self, request):
        user = self.request.user
        return Character.objects.filter(user=user)
