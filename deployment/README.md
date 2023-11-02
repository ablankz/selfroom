# デプロイ用環境

## AWS にて構築

以下のようなインフラ構成となった。
![](./production.drawio)

## Docker コンテナ

サービスは以下の合計 3 つとなり、そのうち backend のサービスのみ、nginx と php-fpm の２コンテナ構成となった。
また、build 時、通常は`COPY`コマンドなどでは親ディレクトリの参照ができないため、`プロジェクトルートのディレクトリ`より以下のようなコマンドを実行することで解決させる。

```sh
docker build -f ./deployment/api/Dockerfile -t selfroom-api .
```
