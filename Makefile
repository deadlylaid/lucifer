migrate:
	python lucifer/manage.py makemigrations users posts
	python lucifer/manage.py migrate

reset_db:
	python lucifer/manage.py reset_db --noinput
