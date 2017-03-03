from rest_framework.generics import ListAPIView
from game.items.api.serializers import ItemSerializer
from game.items.models import Item


class ItemListAPIView(ListAPIView):

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
