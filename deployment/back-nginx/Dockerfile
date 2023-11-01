FROM nginx

COPY ../../apps/api/selfroom-api /var/www/html
COPY ../../prod-env/back-nginx.default.conf /etc/nginx/conf.d/default.conf

ENV TZ=Asia/Tokyo

EXPOSE 80