cd ..
docker stop person-fd
docker build . -t apollo-server-hot-reload-example-fd
docker build dev -t apollo-server-hot-reload-example-dev-fd

docker run --name person-fd --network host -d -i --rm -p 4001:4001 -v /home/alissonvisa/projects/quarkus-proto1-fd:/app apollo-server-hot-reload-example-dev-fd