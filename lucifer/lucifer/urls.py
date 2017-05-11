from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from .views import Home
from users.views import *
from posts.views import *

from game.views import *
from game.api.views import *
from game.characters.api.views import *
from game.items.api.views import *
from game.monsters.api.views import *
from game.skills.api.views import *
from game.npc.api.views import *
from game.quests.api.views import *
from game.stages.api.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', Home.as_view(), name='home'),
    url(r'^joinus/$', JoinUs.as_view(), name='joinus'),
    url(r'^logout/$', LogOut.as_view(), name='logout'),
    url(r'^login/$', LogIn.as_view(), name='login'),
    url(r'^profile/$', Profile.as_view(), name='profile'),

    url(r'^freeboard/$', ListFreeBoard.as_view(), name='free_list'),
    url(r'^freeboard/create/$', CreateFreeBoard.as_view(), name='freecreate'),
    url(r'^freeboard/(?P<pk>\d+)/$', DetailFreeBoard.as_view(), name='free_detail'),
    url(r'^freeboard/(?P<pk>\d+)/answer/create/$', CreateAnswer.as_view(), name='answer_create'),
    url(r'^freeboard/(?P<pk>\d+)/comment/create/$', CommentCreateView.as_view(), name='comment_create'),

    url(r'^notice/$', ListNotice.as_view(), name='notice_list'),
    url(r'^notice/(?P<pk>\d+)/$', NoticeDetailView.as_view(), name='notice_detail'),
    url(r'^ranking/$', RankingView.as_view(), name='ranking'),
    url(r'^events/$', ListEvent.as_view(), name='event_list'),
    url(r'^events/(?P<pk>\d+)/$', EventDetailView.as_view(), name='event_detail'),
    url(r'^qna/$', QnaCreateView.as_view(), name='qna'),

    url(r'^storyintro/$', StoryIntro.as_view(), name='storyintro'),
    url(r'^storyintrodetail/$', StoryIntroDetail.as_view(), name='storyintrodetail'),
    url(r'^jobintro/$', JobIntro.as_view(), name='jobintro'),
    url(r'^screenshot/$', ScreenShotListView.as_view(), name='screenshot'),
    url(r'^screenshot/(?P<pk>\d+)/$', ScreenShotDetailView.as_view(), name='screenshot_detail'),
    url(r'^screenshot/create/$', ScreenShotCreateView.as_view(), name='screenshot_create'),
    url(r'^faq/$', Faq.as_view(), name='faq'),
    url(r'^policy/$', Policy.as_view(), name='policy'),
    url(r'^bugnotice/$', BugNotice.as_view(), name='bugnotice'),

    url(r'^check/chracter/$', CheckCharacter.as_view(), name='checkcharacter'),

    url(r'^create/chracter/$', CreateCharacter.as_view(), name='createcharacter'),
    url(r'^gamestart/$', GameStartView.as_view(), name='gamestart'),

    url(r'^api/gamestart/data/$', GameStartAPIView.as_view(), name='api_gamestart'),
    url(r'^api/gamesave/data/$', GameSaveAPIView.as_view(), name='api_gamesave'),

    url(r'^api/user/character/$', CharacterAPIView.as_view(), name='api_character'),
    url(r'^api/user/character/status/$', StatusAPIView.as_view(), name='api_status'),
    url(r'^api/user/character/inventory/$', InventoryAPIView.as_view(), name='api_inventory'),
    url(r'^api/user/character/equipment/$', EquipmentAPIView.as_view(), name='api_equipment'),
    url(r'^api/user/character/characterquest/$', CharacterQuestAPIView.as_view(), name='api_characterquest'),
    url(r'^api/user/character/learnedskill/$', LearnedSkillAPIView.as_view(), name='api_learnedskill'),
    url(r'^api/user/character/quickslot/$', QuickSlotAPIView.as_view(), name='api_quickslot'),

    url(r'^api/item/list/$', ItemListAPIView.as_view(), name='api_item_list'),

    url(r'^api/monster/list/$', MonsterListAPIView.as_view(), name='api_monster_list'),

    url(r'^api/skill/list/$', SkillListAPIView.as_view(), name='api_skill_list'),

    url(r'^api/npc/list/$', SkillListAPIView.as_view(), name='api_npc_list'),

    url(r'^api/quest/list/$', SkillListAPIView.as_view(), name='api_quest_list'),

    url(r'^api/stage/list/$', StageListAPIView.as_view(), name='api_stage_list'),

    url(r'^summernote/', include('django_summernote.urls')),

    url('', include('social_django.urls', namespace='social')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
        ]
