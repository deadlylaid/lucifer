from rest_framework.generics import ListAPIView, RetrieveAPIView

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
