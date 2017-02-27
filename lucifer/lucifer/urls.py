"""lucifer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from .views import Home
from users.views import *
from posts.views import *

from game.characters.views import *
from game.characters.api.views import *
from game.items.api.views import *
from game.monsters.api.views import *
from game.skills.api.views import *
from game.npc.api.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', Home.as_view(), name='home'),
    url(r'^joinus/$', JoinUs.as_view(), name='joinus'),
    url(r'^logout/$', LogOut.as_view(), name='logout'),
    url(r'^login/$', LogIn.as_view(), name='login'),

    url(r'^freeboard/$', ListFreeBoard.as_view(), name='free_list'),
    url(r'^freeboard/create/$', CreateFreeBoard.as_view(), name='freecreate'),
    url(r'^freeboard/(?P<pk>\d+)/$', DetailFreeBoard.as_view(), name='free_detail'),
    url(r'^freeboard/(?P<pk>\d+)/answer/create/$', CreateAnswer.as_view(), name='answer_create'),
    url(r'^freeboard/(?P<pk>\d+)/comment/create/$', CommentCreateView.as_view(), name='comment_create'),


    url(r'^user/character/$', CharacterDetail.as_view(), name='character_detail'),
    url(r'^api/user/character/status/$', StatusAPIView.as_view(), name='api_status'),
    url(r'^api/user/character/$', CharacterAPIView.as_view(), name='api_character'),

    url(r'^api/item/list/$', ItemListAPIView.as_view(), name='api_item_list'),

    url(r'^api/monster/list/$', MonsterListAPIView.as_view(), name='api_monster_list'),

    url(r'^api/skill/list/$', SkillListAPIView.as_view(), name='api_skill_list'),

    url(r'^api/npc/list/$', SkillListAPIView.as_view(), name='api_npc_list'),

    url(r'^summernote/', include('django_summernote.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
        ]
