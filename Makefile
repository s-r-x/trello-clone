start_dev:
	docker-compose -f docker-compose.dev.yml up
back_dep:
	docker exec trello-back npm i --save $(dep)