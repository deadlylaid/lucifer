migrate:
	python lucifer/manage.py makemigrations users posts characters skills items monsters stages npc quests
	python lucifer/manage.py migrate

reset_db:
	python lucifer/manage.py reset_db

clean:
	find ./ -type f -name "\.*swp" -delete
	find . -name "*.pyc" -exec rm -rf {} \;
	find . -name __pycache__/ -type d -exec rm -rf {} \;
	find . -name '.DS_Store' -type f -delete

tests:
	python lucifer/manage.py test posts users game

fakecharacter:
	python lucifer/manage.py fake_character_create

fakeitem:
	python lucifer/manage.py fake_item_create
