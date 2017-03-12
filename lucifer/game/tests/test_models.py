from django.test import TestCase

from posts.tests.test_models import UserCreateMixin
from game.characters.models import *
from users.models import *


# 캐릭터 생성 클래스
class CharacterCreateMixin(UserCreateMixin):

    def __init__(self):
        self._user = User.objects.create_user(
                username='TestUser',
                password='123',
                )

    def character(self, nickname, job):

        character = Character.objects.create(
                user=self._user,
                nickname=nickname,
                job=job,
                )
        return character


class CharacterTest(TestCase, CharacterCreateMixin):

    # 로그인 된 유저는 캐릭터를 생성할 수 있다.
    def test_user_can_create_character(self):

        character = CharacterCreateMixin()
        created_character = character.character('TestCharacter', 'barbarian')

        self.assertEqual(created_character.nickname, 'TestCharacter')
        self.assertEqual(created_character.job, 'barbarian')
        self.assertTrue(created_character.status)
