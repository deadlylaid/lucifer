from django.apps import AppConfig


class CharacterAppConfig(AppConfig):

    name = 'game'

    def ready(self):
        from game.characters.models import Character
        from game.skills.models import Skill
