from django.apps import AppConfig


class CharacterAppConfig(AppConfig):

    name = 'game'

    def ready(self):
        from game.characters.models import Character
        from game.characters.models import Status
        from game.characters.models import LearnedSkill
        from game.characters.models import Inventory
        from game.characters.models import QuickSlot
        from game.characters.models import Equipment

        from game.skills.models import Skill

        from game.items.models import Item

        from game.monsters.models import Monster

        from game.stages.models import Stage

        from game.npc.models import NPC

        from game.quests.models import Quest