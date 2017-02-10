migrate:
	python lucifer/manage.py makemigrations users posts game
	python lucifer/manage.py migrate

reset_db:
	python lucifer/manage.py reset_db

clean:
	find ./ -type f -name "\.*swp" -delete
	find . -name "*.pyc" -exec rm -rf {} \;
	find . -name "__pycache__/" -exec rm -rf {} \;
