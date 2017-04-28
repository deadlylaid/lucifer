from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from game.characters.api.serializers import EquipmentSerializer
from game.characters.models import Equipment


class EquipmentAPIView(ListAPIView):

    serializer_class = EquipmentSerializer

    def get_queryset(self):

        character = self.request.user.character
        return Equipment.objects.filter(character=character)

    def post(self, request):

        character = self.request.user.character
        type_is = request.data.get('type_is')
        item = request.data.get('selectedItem')

        equipments = Equipment.objects.filter(character=character, body_parts=type_is)

        if equipments:
            weapon = equipments[0]
            weapon.item_name = item
            weapon.save
        else:
            Equipment.objects.create(
                character=character,
                item_name=item,
                body_parts=type_is,
            )

        return Response(status=status.HTTP_200_OK)
