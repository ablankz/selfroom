#!/bin/bash
expand_variables() {
    local content
    content=$(< "$1")  # テンプレートファイルの内容を読み込む
    
    # 環境変数を正規表現で検索し、対応する値で置き換える
    for var in $(compgen -A variable); do
        value="${!var}"  # 環境変数の値を取得
        content="${content//\$\{$var\}/$value}"  # 置換
    done
    echo "$content" > "$2"
}

expand_variables /usr/local/etc/redis/templates/redis.conf.template /usr/local/etc/redis/redis.conf
chmod 644 /usr/local/etc/redis/redis.conf
redis-server /usr/local/etc/redis/redis.conf