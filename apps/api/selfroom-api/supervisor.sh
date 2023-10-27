#!/bin/bash
args=("$@")
sudo docker compose exec api supervisorctl "${args[@]}"