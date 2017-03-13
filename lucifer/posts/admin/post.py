from django.contrib import admin

from posts.models import *


@admin.register(Notice)
class NoticeModelAdmin(admin.ModelAdmin):

    list_display = (
            'user',
            'title',
            'sumnail_image',
            'contents',
            'created_at',
            )
