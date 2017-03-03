from rest_framework.generics import ListAPIView
from game.monsters.models import Monster
from game.monsters.api.serializer import MonsterSerializer


class MonsterListAPIView(ListAPIView):

    queryset = Monster.objects.all()
    serializer_class = MonsterSerializer
