#!/usr/bin/env bash
php artisan migrate --force
chmod -R 777 bootstrap 
chmod -R 777 storage

sh -c "/usr/bin/supervisord"

supervisorctl reread
supervisorctl update
supervisorctl start php-fpm:*
supervisorctl start laravel-worker:*