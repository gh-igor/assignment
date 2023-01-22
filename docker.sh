#!/bin/bash

uid=$(id -u)

docker-compose down

docker-compose up -d --build

docker exec -it --user ${uid} front_end /bin/sh

docker-compose down
