#!/bin/bash

rsync -avzhP --delete ~/Developer/bettermode/interview-task-backend/ root@82.102.10.111:~/bettermode/interview-task-backend

ssh root@82.102.10.111 'cd ~/bettermode/interview-task-backend/deploy-files; docker compose down; docker compose up -d --build; docker compose logs;'