docker infrastructure 

 docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build 

 docker exec -it node-docker-mongo-1 mongosh -u "root" -p "example" 

