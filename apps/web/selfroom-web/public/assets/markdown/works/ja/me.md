### 詳細

完全に個人開発のポートフォリオサイト。制作物はこのサイト自体であり、自己紹介や制作物、経歴などとともに簡易的なチャットアプリケーションを作成しました。このアプリケーションに関しては、[こちら](https://me.selfroom.net/overview)から概要を確認できます。<br/>
個人開発で最後までできた制作物は初めてでしたが、Web 開発における今まで使用してきた技術をいつくか使用しながら作成できました。一旦の集大成となる作品なので、一番使い慣れた、バックエンドは Laravel、フロントエンドは React を使用しました。<br/>
実際のコードについては[GitHub](https://github.com/ablankz/selfroom)にて公開しています。<br/>

### 役割

**すべてを担当**<br/>

バックエンド

- 上記で説明した通り、Laravel を使用し、API サーバーを作成しました。費用のこともあり、メール機能などの作成はできませんでしたが、最小限のログインからリアルタイムチャットの機能までは実装しました。
- Laravel を使う利点を多く取り入れながら、フレームワークで補えていない部分に関しては、ディレクトリ構造のカスタマイズなどを行いながら作成しました。
- API 設計、データベース設計から初めて約 1 ヶ月で作成したプロジェクトです(今後機能を追加する可能性はある)。
- API のエンドポイントについては[Swagger UI](https://openapi.selfroom.net)もしくは[独自の API アクセスツール](https://me.selfroom.net/raw-api)にて確認が行えます。

フロントエンド

- React にてコードを記述。
- 普段からフロントは React の方と作業することが多いため、動作テストのためにロジック等のみ書くことがあるので今回も使い慣れた React を採用。
- デザインに関しては、[Minimal - Client and Admin Dashboard](https://minimals.cc/)のテンプレートを使用しています。

インフラ

- GitHub を確認してもらえれば、わかりますが開発段階では Docker を使用しています。
- これをそのままデプロイしていきたいため、AWS の ECS(+Forgate)を使用します。
- 費用の制限はありますが、できるだけ種類の多いサービスを採用したいと考えています。

### 利用技術

Laravel

- バックエンドは laravel を使用する
- 多少ディレクトリ構造は独自のものにアレンジしてる

React(vite)

- フロントエンドは react を使用
- 今回は nextJs は使わず、react 単体で行うビルドツールは webpack ではなく高速な vite を使用して開発

Docker

- 開発段階では少なくとも docker を使用
- 本番環境も今回初めて AWS の ECS を使う予定

AWS

- ecs 以外にも、aws のいろいろなサービスを使用予定
- ただし、マネージドサービスは費用と相談しながら

Pusher

- chat に使用するための webSocket は pusher のサービスを利用

Postgresql

- RDB としては今回 postgres を採用(というより他は mysql 以外触ったことない)

Redis

- キーバリュー型の db には redis を使用

Cron

- バッチ処理は cron に登録して自動実行させる

---

#### リンク集

- [サイトリンク](https://me.selfroom.net)
- [Swagger UI](https://openapi.selfroom.net)
- [GitHub](https://github.com/ablankz/selfroom)
