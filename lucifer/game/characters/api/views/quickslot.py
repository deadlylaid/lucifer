from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from game.characters.api.serializers import EquipmentSerializer
from game.characters.models import QuickSlot


class QuickSlotAPIView(ListAPIView):

    serializer_class = EquipmentSerializer

    def get_queryset(self):

        character = self.request.user.character
        return QuickSlot.objects.filter(character=character)

    def post(self, request):

        character = self.request.user.character
        potion_name = request.data.get('potionName')
        count = request.data.get('count')

        quickslot = QuickSlot.objects.filter(character=character)

        if quickslot:
            quickslot[0].potion_name = potion_name
            quickslot[0].save()
        else:
            QuickSlot.objects.create(
                    character=character,
                    potion_name=potion_name,
                    count=count,
                    )

        return Response(status=status.HTTP_200_OK)

    def delete(self, request):
        character = self.request.user.character
        quickslot = QuickSlot.objects.filter(character=character)

        quickslot[0].delete()

        return Response(status=status.HTTP_200_OK)
