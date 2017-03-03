from drf_multiple_model.views import MultipleModelAPIView

from game.characters.models import Character
from game.characters.api.serializers import CharacterSerializer

from game.items.models import Item
from game.items.api.serializers import ItemSerializer

from game.monsters.models import Monster
from game.monsters.api.serializer import MonsterSerializer


class GameStartAPIView(MultipleModelAPIView):

    def get_queryList(self):
        logined_user = self.request.user

        queryList = (
                (Character.objects.filter(user=logined_user), CharacterSerializer),
                (Monster.objects.all(), MonsterSerializer),
                (Item.objects.all(), ItemSerializer),
                )

        return queryList
