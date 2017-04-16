from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from game.characters.api.serializers import EquipmentSerializer
from game.characters.models import Equipment


class EquipmentAPIView(ListAPIView):

    serializer_class = EquipmentSerializer

    def get_queryset(self):

        character = self.request.user.character
        return Equipment.objects.filter(character=character)
