from django.test import TestCase
from django.core.urlresolvers import resolve
from users.views import LogIn
from posts.tests.test_models import UserCreateMixin
from posts.models.freeboard import FreeBoard


class FreeBoardTest(TestCase, UserCreateMixin):

    def test_ananimus_user_can_not_post_freeboard(self):
        response = self.client.get('/freeboard/create/')
        self.assertRedirects(response, '/login/?next=/freeboard/create/')

    def test_logined_user_can_post_freeboard(self):
        usercreate_mixin = UserCreateMixin()
        created_user = usercreate_mixin.user('testname', 'password11')

        self.client.login(username='testname', password='password11')

        response = self.client.post(
                '/freeboard/create/',
                data={
                    'title': 'TestFreeBoardTitle',
                    'content': 'TestFreeBoardContent',
                    }
                )

        self.assertEqual(FreeBoard.objects.count(), 1)
