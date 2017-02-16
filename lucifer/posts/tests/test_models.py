from posts.models import *
from users.models import User
from django.test import TestCase


class UserCreateMixin:

    def user(self, username, password):
        user = User.objects.create_user(
                username=username,
                password=password,
                )
        return user


class FreeBoardModelTest(TestCase, UserCreateMixin):

    # Post 모델을 이용해서 post를 만들 수 있다.
    def test_user_can_use_freeboard_answer_comment(self):

        usercreate_mixin = UserCreateMixin()
        created_user1 = usercreate_mixin.user('TestUser', '123')
        created_user2 = usercreate_mixin.user('TestUser2', '123')

        freeboard = FreeBoard.objects.create(
                user=created_user1,
                title='TestPost1',
                content='TestPostContents',
                )

        self.assertTrue(FreeBoard.objects.first())

        answer = Answer.objects.create(
                user=created_user2,
                freeboard=freeboard,
                contents='answer123123123',
                )

        self.assertTrue(Answer.objects.first())

        comment = Comment.objects.create(
                user=created_user1,
                freeboard=freeboard,
                contents='This is comment',
                )

        self.assertTrue(Comment.objects.first())
