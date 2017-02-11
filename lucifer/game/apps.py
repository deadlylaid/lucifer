from django.apps import AppConfig


class CharacterAppConfig(AppConfig):

    name = 'game'

    def ready(self):
        from game.characters.models import Character
        from game.skills.models import Skill
        from game.items.models import Item
        from game.monsters.models import Monster
        from game.stages.models import Stage
