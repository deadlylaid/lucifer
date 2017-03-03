from drf_multiple_model.views import MultipleModelAPIView

from game.characters.models import Character
from game.characters.api.serializers import CharacterSerializer

from game.items.models import Item
from game.items.api.serializers import ItemSerializer

from game.monsters.models import Monster
from game.monsters.api.serializer import MonsterSerializer

from game.npc.models import NPC
from game.npc.api.serializers import NPCSerializer

from game.quests.models import Quest
from game.quests.api.serializer import QuestSerializer

from game.skills.models import Skill
from game.skills.api.serializers import SkillSerializer

from game.stages.models import Stage
from game.stages.api.serializers import StageSerializer


class GameStartAPIView(MultipleModelAPIView):

    def get_queryList(self):
        logined_user = self.request.user

        queryList = (
                (Character.objects.filter(user=logined_user), CharacterSerializer),
                (Monster.objects.all(), MonsterSerializer),
                (Item.objects.all(), ItemSerializer),
                (NPC.objects.all(), NPCSerializer),
                (Quest.objects.all(), QuestSerializer),
                (Skill.objects.all(), SkillSerializer),
                (Stage.objects.all(), StageSerializer),
                )

        return queryList
