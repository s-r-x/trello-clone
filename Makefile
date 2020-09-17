dev_file = docker-compose.dev.yml
test_file = docker-compose.e2e-test.yml

dev:
	docker-compose -f $(dev_file) up
wipe_mongo_dev:
	docker-compose -f $(dev_file) rm -v mongo
back_dep:
	docker exec trello-back npm i --save $(dep)
back_test:
	docker-compose -f $(test_file) run back
