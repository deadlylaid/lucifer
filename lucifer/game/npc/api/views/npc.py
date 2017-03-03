from rest_framework.generics import ListAPIView
from game.npc.models import NPC
from game.npc.api.serializers import NPCSerializer


class NPCListAPIView(ListAPIView):

    queryset = NPC.objects.all()
    serializer_class = NPCSerializer
