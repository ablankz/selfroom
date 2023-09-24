#!/bin/bash
args=("$@")
sudo docker compose exec api php artisan "${args[@]}"
sudo chmod -R a+w ./database
sudo chmod -R a+w ./app
sudo chmod -R a+w ./config
sudo chmod -R a+w ./tests