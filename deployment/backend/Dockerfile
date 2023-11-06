FROM php:8.2-fpm

# nginx
RUN apt-get update \
  && apt-get install -y nginx \
  && mkdir -p /var/www/html/

RUN groupadd nginx \
  && useradd -g nginx nginx \
  && usermod -s /bin/false nginx

COPY ../../prod-env/back-nginx.default.conf /etc/nginx/conf.d/default.conf
COPY ../../prod-env/back-nginx.fastcgi_params /etc/nginx/fastcgi_params
COPY ../../prod-env/back-nginx.mime.types /etc/nginx/mime.types
COPY ../../prod-env/back-nginx.nginx.conf /etc/nginx/nginx.conf

# php
RUN apt-get install -y zlib1g-dev libzip-dev iputils-ping net-tools dnsutils libpq-dev supervisor\
  && docker-php-ext-install zip pdo pgsql pdo_pgsql

RUN apt-get update && apt-get install -y \
  busybox-static \
  && apt-get clean

# タイムゾーン設定
ENV TZ=Asia/Tokyo \
  # locale
  LANG=ja_JP.UTF-8 \
  LANGUAGE=ja_JP:ja \
  LC_ALL=ja_JP.UTF-8 

#Composer install
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin

# アプリケーションフォルダを環境変数として設定
ENV APP_HOME /var/www/html

# ソースコードと.envファイルをDockerImageに埋め込む
COPY ../../apps/api/selfroom-api $APP_HOME
COPY ../../prod-env/.api.env.production /var/www/html/.env

# その他設定ファイル
COPY ../../apps/api/php.ini /usr/local/etc/php/
COPY ../../apps/api/docker.conf /usr/local/etc/php-fpm.d/docker.conf
COPY ../../prod-env/api.supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 初回起動時に行うスクリプトファイルをコピーして実行権限を与える
COPY ../../prod-env/api.start.sh /var/www/html/start.sh
RUN chmod 744 /var/www/html/start.sh

WORKDIR $APP_HOME

# フレームワークに必要なモジュールをDockerImageにインストール
RUN composer install --no-dev --no-interaction

# Laravel 初期化
RUN php artisan key:generate
RUN php artisan jwt:secret

# データベースクエリ実行
# RUN php artisan migrate:fresh --seed

CMD ["bash", "start.sh"]

EXPOSE 80