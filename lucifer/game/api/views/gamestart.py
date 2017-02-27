from rest_framework.generics import ListAPIView
from game.characters.models import Character
from game.api.serializers import GameStartSerializer


class GameStartAPIView(ListAPIView):

    serializer_class = GameStartSerializer

    def get_queryset(self):
        logined_user = self.request.user
        return Character.objects.filter(user=logined_user)
