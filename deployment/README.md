# デプロイ用環境

## AWS にて構築

以下のようなインフラ構成となった。
![](./production.drawio.svg)

> [!WARNING]
> 作成後、oauth認証の実装都合上(+privateにすることで発生するVPCエンドポイントの料金が高い(毎回pullする前だけ立ち上げればいいが面倒))、apiコンテナからの外部ネットワークアクセスが必要であったため、NATゲートウェイは料金の都合で使用せず、`publicサブネット`配置に変更した。
> サービスの数も料金の都合からwebとopenAPIはフロントでまとめたサービスに変更。
> Fargateのスペックも両サービスともに最小限のスペックで実装している。
> (11月5日追記) Fargateもやめ、EC2のコンテナに変更。
> それぞれのインスタンスは`api, web, openapi`の順に`t3.micro, t2.micro, t2.nano`で2(apiのみ3)台までのオートスケーリングの構成となった。

## Docker コンテナ

サービスは以下の合計 3 つとなり、そのうち backend のサービスのみ、nginx と php-fpm の２コンテナ構成となった。
また、build 時、通常は`COPY`コマンドなどでは親ディレクトリの参照ができないため、`プロジェクトルートのディレクトリ`より以下のようなコマンドを実行することで解決させる。

```sh
docker build -f ./deployment/api/Dockerfile -t selfroom-api .
```
