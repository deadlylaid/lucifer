from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import Http404

from users.models import User
from game.characters.api.serializers import InventorySerializer
from game.characters.models import Inventory
from game.items.models import Item


class InventoryAPIView(ListAPIView):

    serializer_class = InventorySerializer

    def get_queryset(self):

        character = self.request.user.character
        return Inventory.objects.filter(character=character)

    def post(self, request):
        # 넘어온 데이터를 받는다
        character = self.request.user.character
        item_name = request.data.get('character')
        selected_item = request.data.get('selectedItem')

        # 해당 object가 존재하지 않을 경우 404
        item = get_object_or_404(Item, name=selected_item)

        inventory = character.inventory_set.create(
                character=character,
                item=item,
                count=1,
                )
        inventory.save()

        serializer = InventorySerializer(inventory)
        if InventorySerializer(data=serializer.data):
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQEUST)

    def delete(self, request):
        # 넘어온 데이터를 받는다
        character = self.request.user.character
        item_name = request.data.get('character')
        selected_item = request.data.get('selectedItem')

        item = get_object_or_404(Item, name=selected_item)

        items = character.inventory_set.filter(item=item)
        items[0].delete()

        return Response(status=status.HTTP_200_OK)
