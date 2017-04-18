from django.contrib import admin
from game.quests.models import Quest


@admin.register(Quest)
class QuestModelAdmin(admin.ModelAdmin):

    list_display = admin.ModelAdmin.list_display + (
            'title',
            )
