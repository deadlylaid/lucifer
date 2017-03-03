from rest_framework.generics import ListAPIView
from game.stages.api.serializers import StageSerializer
from game.stages.models import Stage


class StageListAPIView(ListAPIView):

    queryset = Stage.objects.all()
    serializer_class = StageSerializer
