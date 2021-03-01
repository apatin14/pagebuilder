install:
	yarn install
	clear

run:
	npm start
	clean

build:
	
	docker-compose -f docker/docker-compose.yml build
	clean

up:
	docker-compose -f docker/docker-compose.yml up
	#clear

wp:
	webpack -w
	clean

bump:
	docker-compose -f docker/docker-compose.yml up --build
	clean

deleteAll:
	docker system prune -a 

down:
	docker-compose -f docker/docker-compose.yml down
	docker-compose -f docker/docker-compose.yml stop
	clean

production:
	docker-compose -f docker/docker-compose.yml up -d --build
	clean