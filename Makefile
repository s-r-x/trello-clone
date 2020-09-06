dev_file = docker-compose.dev.yml
dev:
	docker-compose -f $(dev_file) up
wipe_mongo_dev:
	docker-compose -f $(dev_file) rm -v mongo
back_dep:
	docker exec trello-back npm i --save $(dep)
