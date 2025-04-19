mongo-create-volume:
	docker volume create settingly-mongo

mongo-run:
	docker run -d --name settingly-mongo \
               -v settingly-mongo:/data \
               -p 27017:27017 \
               mongo:latest

mongo-cli: 
	docker exec -it settingly-mongo mongosh