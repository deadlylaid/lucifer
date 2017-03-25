from django.contrib import admin

from posts.models import *


@admin.register(Notice)
class NoticeModelAdmin(admin.ModelAdmin):

    list_display = admin.ModelAdmin.list_display + (
            'user',
            'title',
            'sumnail_image',
            'contents',
            'created_at',
            )


@admin.register(FreeBoard)
class FreeBoardModelAdmin(admin.ModelAdmin):

    list_display = admin.ModelAdmin.list_display + (
            'user',
            'title',
            'content',
            'created_at',
            )


@admin.register(QNA)
class QNAModelAdmin(admin.ModelAdmin):

    list_display = admin.ModelAdmin.list_display + (
            'user',
            'title',
            'content',
            )


@admin.register(Event)
class EventModelAdmin(admin.ModelAdmin):
    list_display = admin.ModelAdmin.list_display + (
            'title',
            'user',
            'contents',
            )
