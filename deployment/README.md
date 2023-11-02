# デプロイ用環境

## AWS にて構築

以下のようなインフラ構成となった。
![](./production.drawio.svg)

> [!WARNING]
> 作成後、oauth認証の実装都合上、apiコンテナからの外部ネットワークアクセスが必要であったため、NATゲートウェイは料金の都合で使用せず、apiコンテナのみ`publicサブネット`配置に変更した。

## Docker コンテナ

サービスは以下の合計 3 つとなり、そのうち backend のサービスのみ、nginx と php-fpm の２コンテナ構成となった。
また、build 時、通常は`COPY`コマンドなどでは親ディレクトリの参照ができないため、`プロジェクトルートのディレクトリ`より以下のようなコマンドを実行することで解決させる。

```sh
docker build -f ./deployment/api/Dockerfile -t selfroom-api .
```
