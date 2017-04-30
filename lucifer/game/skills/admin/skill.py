from django.contrib import admin
from game.skills.models import Skill


@admin.register(Skill)
class SkillModelAdmin(admin.ModelAdmin):

    list_display = admin.ModelAdmin.list_display + (
            'name',
            'limit_level',
            )
