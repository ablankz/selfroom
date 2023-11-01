FROM nginx

COPY ../../apps/web/selfroom-web/dist /var/www/html
COPY ../../prod-env/front-default.conf /etc/nginx/conf.d/default.conf

ENV TZ=Asia/Tokyo

EXPOSE 80