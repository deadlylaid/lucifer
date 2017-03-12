from django.core.management import BaseCommand

from faker import Faker
from users.models import User
from game.characters.models import Character, Status


class Command(BaseCommand):

    def handle(self, **options):

        fake = Faker('ko_KR')

        self.stdout.write("Fake Characters Creating...")

        User.objects.all().delete()

        Character.objects.all().delete()
        Status.objects.all().delete()

        for _ in range(1, 20):

            fake_name = fake.name()
            fake_user = User.objects.create_user(
                    username=fake_name,
                    password='123',
                    )

            Character.objects.create(
                    user=fake_user,
                    nickname='%snickname' % (fake_user),
                    job='야만전사',
                    )

            fake_user.has_character = True
            fake_user.save()

        print(User.objects.first())
        self.stdout.write("Complete")
