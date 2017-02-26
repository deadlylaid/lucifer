from django.apps import AppConfig


class CharacterAppConfig(AppConfig):

    name = 'game.characters'

    def ready(self):

        from game.characters.signals.post_save import post_save
