from django.core.management import BaseCommand

from faker import Faker
from game.monsters.models import Monster


class Command(BaseCommand):

    def handle(self, **options):

        fake = Faker('ko_KR')

        self.stdout.write("Fake Monster Createing...")

        Monster.objects.all().delete()

        for _ in range(1, 20):

            fake_name = fake.name()
            fake_monster_name = '몬스터_' + fake_name

            Monster.objects.create(
                    name=fake_monster_name,
                    )

        self.stdout.write("Complete")
