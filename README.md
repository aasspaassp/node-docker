docker infrastructure 

crear contenedores

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build 

docker exec -it node-docker-mongo-1 mongosh -u "root" -p "example" 

Ir a la consola de mongo

docker exec -it node-docker-mongo-1 mongosh -u "root" -p "example"  

curl -X POST http://localhost:3000/api/login 
     -d '{
       "email": "jane.smith@example.com",
       "password": "hashedPassword123"
     }'
     
curl http://localhost:3000/api/doctors   

curl -X POST http://localhost:3000/api/login?email=yH1th@doctorsapp.com&password=fP9JBM

curl -X POST http://localhost:3000/api/login?email=eqtoo@doctorsapp.com&password=dalepapimasduro


reiniciar sin perder volumenes
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d -V 
