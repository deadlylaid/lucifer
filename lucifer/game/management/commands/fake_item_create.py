from django.core.management import BaseCommand

from faker import Faker
from game.items.models import Item


class Command(BaseCommand):

    def handle(self, **options):

        fake = Faker('ko_KR')

        self.stdout.write("Fake Items Createing...")

        Item.objects.all().delete()

        for _ in range(1, 20):

            fake_name = fake.name()
            fake_item_name = '아이템_' + fake_name

            Item.objects.create(
                    name=fake_item_name,
                    type_is='무기',
                    )

        self.stdout.write("Complete")
