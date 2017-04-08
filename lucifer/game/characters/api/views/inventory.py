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
        item_name = self.request.POST.get('item_name')
        count = self.request.POST.get('count')

        # 해당 object가 존재하지 않을 경우 404
        item = get_object_or_404(Item, name=item_name)

        inventory = character.inventory_set.create(
                character=character,
                item=item,
                count=count,
                )

        serializer = InventorySerializer(inventory)
        if InventorySerializer(data=serializer.data):
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQEUST)
