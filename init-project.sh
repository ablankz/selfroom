#!/bin/bash
api_env() {
  if [ ! -e .env ]; then
      cp .env.example .env
  fi
}

# 検索する文字列
search_string="APP_ROOT_PATH="

# 置換する文字列
replace_string="APP_ROOT_PATH=${PWD}"

if [ ! -e .env ]; then
    cp .env.example .env && sed -i s#^${search_string}.*#${replace_string}#g .env

    # while true; do
        

    #     # 正規表現を使用してメールアドレスの形式を検証
    #     if [[ $email =~ ^[a-zA-Z0-9_\.\-]+?@[A-Za-z0-9_\.\-]+$ ]]; then
    #         echo "入力されたメールアドレスは有効です: $email"
    #         break  # 正しい形式が入力されたらループを終了
    #     else
    #         echo "無効なメールアドレス形式です。再度入力してください。"
    #     fi
    # done

    read -p "メールアドレスを入力してください: " email

    # 検索する文字列
    search_string="PGADMIN_DEFAULT_EMAIL="

    # 置換する文字列
    replace_string="PGADMIN_DEFAULT_EMAIL=${email}"

    sed -i s#^${search_string}.*#${replace_string}#g .env
fi

sudo docker compose down --volumes --remove-orphans && \
if [ ! -d ./apps/web/selfroom-web/node_modules ]; then
  mkdir ./apps/web/selfroom-web/node_modules
fi
cd ./apps/api/selfroom-api/ && api_env && \
sudo chmod -R a+w storage && sudo chmod -R a+w bootstrap/cache && \
composer update && php artisan key:generate && php artisan jwt:secret && cd ../../../ && \
sudo docker compose build && \
sudo docker compose up -d && \
sudo docker compose exec backend-server chown www-data storage/ -R && \
sudo docker compose exec backend-server chown www-data bootstrap/cache -R && \
sudo chmod a+x ./apps/api/selfroom-api/container-artisan.sh && \
sudo docker compose exec api php artisan migrate:fresh --seed