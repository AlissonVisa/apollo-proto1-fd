cd ..
docker stop person-fd
docker build . -t apollo-server-hot-reload-example-fd
docker run --name person-fd --network host -d -i --rm -p 4001:4001 apollo-server-hot-reload-example-fd