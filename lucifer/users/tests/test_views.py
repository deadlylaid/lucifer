from django.test import TestCase
from django.core.urlresolvers import resolve
from lucifer.views.home import Home
from users.views import JoinUs, LogIn


class HomePageTest(TestCase):

    # '/'로 들어가면 Home view를 호출한다
    def test_root_url_resolves_to_home_page_view(self):
        found = resolve('/')
        self.assertEqual(found.func.__name__, Home.__name__)

    # '/'로 들어가면 home.html이 랜더링된다.
    def test_root_url_render_home_html(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'home.html')


class JoinUsPage(TestCase):

    # 'joinus/'로 들어가면 JoinUs view를 호출한다
    def test_join_us_resolves_to_join_view(self):
        found = resolve('/joinus/')
        self.assertEqual(found.func.__name__, JoinUs.__name__)

    # 'joinus/'로 들어가면 joinus.html이 랜더링된다.
    def test_joinus_url_render_joinus_html(self):
        response = self.client.get('/joinus/')
        self.assertTemplateUsed(response, 'users/joinus.html')


class LogInPage(TestCase):

    # '/login/'로 들어가면 LogIn view를 호출한다
    def test_log_in_resolves_to_join_view(self):
        found = resolve('/login/')
        self.assertEqual(found.func.__name__, LogIn.__name__)

    # '/login/'로 들어가면 login.html이 랜더링 된다.
    def test_login_url_render_login_html(self):
        response = self.client.get('/login/')
        self.assertTemplateUsed(response, 'users/login.html')
