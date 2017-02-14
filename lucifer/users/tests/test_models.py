from django.test import TestCase
from users.models import User


class UserModelTest(TestCase):

    # User모델을 이용해 user를 만들 수 있다.
    def test_create_user(self):

        user1 = User.objects.create_user(
                username='TestUser',
                password='test123',
                email='testuser@test.com',
                )

        user2 = User.objects.create_user(
                username='TestUser2',
                password='test123',
                email='testuser2@test.com',
                )

        created_users = User.objects.all()
        self.assertEqual(created_users.count(), 2)

        first_saved_user = created_users[0]
        second_saved_user = created_users[1]

        self.assertEqual(first_saved_user.username, 'TestUser')
        self.assertEqual(second_saved_user.username, 'TestUser2')
