from rest_framework.generics import ListAPIView
from game.quests.api.serializer import QuestSerializer
from game.quests.models import Quest


class QuestListAPIView(ListAPIView):

    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
