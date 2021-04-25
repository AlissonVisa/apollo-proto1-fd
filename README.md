# quarkus-proto1-fd

## Development docker image
The difference between production and development docker image is in command. The development image needs volume to share the source with host machine.

dev/dockerfile
FROM apollo-server-hot-reload-example

###dev volume
```VOLUME /app```

```CMD [ "npm", "run", "build:dev" ]```

####Because there are changes that influence production image I must rebuild it again.
```docker build . -t apollo-server-hot-reload-example```
####And finally, I can build development image.
```docker build dev -t apollo-server-hot-reload-example-dev```

Run development docker container
After I run this command:

```docker run -p 8080:8080 -v *absolute_path_to_project*:/app apollo-server-hot-reload-example-dev```

where *absolute_path_to_project* is the absolute path to project request return same string like in production mode. After code change, webpack rebuilds code and restarts server.

