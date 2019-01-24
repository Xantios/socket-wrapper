#!/bin/bash

docker rm -f socket-wrapper

docker build . -t socket-wrapper

docker run --name socket-wrapper -p 8080:3000 -v /var/run/docker.sock:/var/run/docker.sock socket-wrapper