# 開発環境構築前提

- 前提
  - Docker
  - Docker Compose
  - Node.js (and NPM)
  - Composer (php)

- npmのインストール
  - [このサイト](https://kinsta.com/jp/blog/how-to-install-node-js/)を参考にしてインストール

- phpのインストール
  - [このサイト](https://kinsta.com/jp/blog/install-php/)を参考にしてインストール 

- composerのinstall(phpは事前に使えるものとする)
  
``` sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

mv composer.phar /usr/local/bin/composer
```
上記を実行後、`composer -v`にて確認しておくこと。

# 開発環境構築(必須)

## ソースコードをローカルに持ってくる

```sh
git clone https://github.com/ablankz/selfroom.git
```

- ※ WSL + Docker Desktop(Use WSL2 based engine) で環境構築をする場合
  - ソースコードを Windows 側に落としてしまうと Windows と Docker の(恐らく)ファイル読み込みが許容できないレベルで遅くなる
  - WSL を使わずに全て Windows 側だけで完結させるか、ソースコードは WSL 側に落とすかにする

## 環境の変更

- デバッグ環境ならスキップしていい。
- `./apps/api/selfroom-api/.env`の`APP_DEBUG=true`の行を`APP_DEBUG=false`に変更する。

## 初期化処理の実行

```bash
cd selfroom-api && sudo chmod u+x init-project.sh && ./init-project.sh
```

## Hosts ファイルの編集

- Nginx の VitualHost で 80 番へのリクエストをフロントエンドサーバとバックエンドサーバに振り分けてる
- hosts ファイルを編集し、frontend と backend のホスト名を`127.0.0.1(localhost)`に向ける
- dbadminとredisは必要に応じて

```hosts
127.0.0.1        selfroom.com
127.0.0.1        api.selfroom.com
127.0.0.1        dbadmin.selfroom.com
127.0.0.1        redis.selfroom.com
127.0.0.1        openapi.selfroom.com
```

## pgAdminの初期設定(必要に応じて)

- `dbadmin.selfroom.com`にブラウザでアクセスした後、ログインする。メールアドレスはinit-projectを実行したときに登録したメールアドレス（確認するならプロジェクト直下のディレクトリの.envの`PGADMIN_DEFAULT_EMAIL`の項目）、パスワードはroot。このとき、言語を日本語に選択しておけば、後々楽。
- 次に、ダッシュボード内のクイックリンク、新しいサーバーを追加を選択。
- 名前は何でも良いので適当(selfroomなど)。
- 接続タブに移動した後、ホスト名には`db`、ユーザ名には`postgres`、パスワードにも`postgres`を選択。
- 他の設定は触らずに保存することで、このdbサーバーが登録される。
- guiで操作、閲覧できる部分も増えるため、結構便利。

# apiサーバー仕様

- 切り出す層が多いので軽くまとめる。

## モデル

- laravelのorm。eloquentを使用してデータベースアクセス。
- このモデルから、基本的にはデータベースのアクセスなどを行う。
- relationなどの定義もできるが、かなり複雑なクエリとかなら、queryBuildetを使ったりする(eloquentの内部でもqbが使われてる)。

## マイグレーション

- dbテーブルの設計書のようなもの。
- コマンド一つでテーブルが作られたりする。

## シーダー

- データの生成を行う。
- ダミーデータなどを生成したいときなどに、`run`メソッド内に記述することでコマンド一つでそのダミーデータが作られる。
- 初期データの登録などももちろん行える。

## ファクトリー

- シーダーから呼び出されることが多め。
- モデルから大量にダミーデータの生成が可能になる。
- もとからfakerというライブラリをプロパティに持つため、ランダムなデータで定義できる。

## ルーティング

- 主にroutes/apiに記載していく。defaultがapiになるように設定済み。
- web.phpへの記載分はweb/ルートでアクセスできるように変更した。

## ゲート

- 認可のうちの一つ。
- 管理者ユーザであるかなど、アプケーション全体でのroleに関する認可処理。

## ポリシー

- 認可のうちの一つ。
- リソース（それぞれのモデル）ごとの認可処理。
- 例えば、一つの記事のモデルに対して、その記事を書いたユーザーのみしか編集できないなどのための認可。

## ミドルウェア

- 事前に必要な処理があった場合などは、ここに記載する。また認証などもここで行う予定。
- ハンドラ処理前の記述は多いが、ハンドラ処理後のロジックもここに書ける。
- 認可のうち、ゲートに関してはここに書くことも多い。

## フォームリクエスト

- フォームデータ（送信データのバリデーションはここで行う）
- ポリシーに関する認可の処理も記載する関数が用意されいるため、ここに書くのもあり。ただ、ビジネスロジックの層ではないので、そこと被るなら考える必要がある。
- ここに認可を置きたい理由はコントローラ（handler）にはあまり、ロジックを書きたくないが、service以降に書くのもビジネスロジックから分離できてないことになる。なのでそこに突入する前に、認可されない場合は弾きたい。

## ルール

- バリデーションの際、通常はもともとある`required`や`string`、`max:10`などで足りることが多いが、独自でルールを作ることも可能。

## コントローラ

- FatControllerにならないように、ビジネスロジックはサービス層に切り出す。
- コントローラ内ではデータの受け渡しのみ(ビジネスロジックに近い認可はここに書くのもあり)。
- とりあえず、認可される前にservice層へ処理が移ることは避ける。
- サービスの呼び出しはusecaseを使う際にdiを使用しているため、appコンテナを使って呼び出す。

## サービス

- laravelのもとの機能にはないが、fatController防止のため作成。
- fatService予防にusecaseを切り出している。
- 基本的にはここがアプリケーションの本質部分。
- ただし、直接データベースへのアクセスは行わない。以下のusecaseで行う。
- データベースのアクセスはusecaseに任せて、他にもstorage関係やmail関係などもここから、ジョブをキューに流したり、イベントを発火させたりする。
- 例外のスローもここより下の層では行わず、これ以下の層ではエラーコードなどのみ返してもらってから、サービスで例外を投げる。

## ユースケース

- 一つ一つのユースケースをクラスとして作成。
- repositoryと違って、汎用的なデータアクセスの抽象化を目的としていないので、一つ一つが一つのロジックとして機能する。（それぞれしっかりと目的を持ったクラス）
- 例えば、clentを作成するだけのクラスなど、クラスの数は多くなる。
- エラーとなってもここでは、独自の`public const`で定義した、値を返すだけで、例外をここから投げるようなことはしない。

## リポジトリ

- データアクセスの抽象化のためのクラスとインタフェース。
- 例えば、データのアクセスの方法が変われば（eloquentからqueryBuilder）、このコードをユースケースにて直接書いていたすれば、一つ一つのクラスすべてに関して、コードの修正が入ることになる。
- リポジトリというインタフェースで簡単なクエリ(findやfindAll、createなど)ラップしておいて、すべてユースケースがこれらを通して、データベースにアクセスするようにすれば、保守性が保たれる。
- しかし今回は以下の理由より採用してない。
  - 簡単なクエリを組み合わせるだけではページネーションや絞り込みなど、複雑なクエリを直接叩くときに比べて、オーバーヘッドが大きくなる（簡単なクエリ自体にオプションとして絞り込み要素などを引数に渡すなどで汎用的にできないこともないが、簡易的なクエリの組み合わせで実現できるという点が失われる）。
  - データの受け渡し（引数や返り値）をもちろんモデルで扱うことはその時点で汎用性にかける（eloquentでしか使えない）ため、これを使うことはできず、これを保守的に型を定義するためにentityやidEntity、valueObjectなどを使って、モデルごとの型を定義する必要がある。これを使うことで汎用性は保たれるもののpolisyやauth認証などlaravelの便利な機能をオーバーライドして使用したりするなど、開発に時間もかかり、それぞれの呼び出しごとに実行時間も長くなるため。

## プロバイダ

- 簡単にいうと、ここに登録しておけば、アプリケーションの呼び出しごとに毎回（リクエストが来るごとにも）呼ばれるので、アプリケーション全体で使えたりする。
- 例えば、routeの設定や、appコンテナへの依存関係などもここに登録しておくと良い。

## コンソール

- コマンドを作成できる。
- 簡単に作成できるので、バッチ処理などで自動化できるものはコマンドを作成しておく。
- 例えば、実行すれば現在の登録者の分析してcsvに出力するようなもの、会員ユーザーにメールを送信するようなどのコマンドを作っておけば、これを管理者ユーザーが実行もできるし、cronに登録して、自動実行も可能で結構便利。(タスクスケジュールという機能が使えそう)

## イベント・リスナ

- イベントを登録しておける。イベントもリスナも自分で作成する。(modelにはもともとイベントが存在するため、データアクセスには必ずeloquentしか使用しないと決めているなら、このイベントに対してリスナを登録するのもあり)
- 以下でやるリスナーを登録しておくことが一般的でこのイベントが発火すれば、このイベントをリッスンしてるイベントリスナが立ち上がることになる。
- イベントは引数を自由に取ることができ、リスナはこのイベントを引数にとって`handle`メソッドが実行されることになる。
- リスナが`ShouldQueue`を実装してるクラスであればこれはキューに流され、非同期で実行されることになる。
- 例えば、clientが作成されたというイベントに対して、そのクライアントにメールを送信するイベントリスナや、クライアントの作成を管理者に送信するイベントリスナ、登録されたことをログに出力するイベントリスナなど、様々なイベントリスナを登録することができる。

## ジョブ・キュー

- ジョブを作成して、キューに流し込める。
- イベントリスナとの使い分けがイマイチ。

## メール

- メールを簡単に送信できるためのクラス。

## Notification

- smsなどでメール送信可能らしい。
- 使ったことない。mailの機能で事足りることが多い。

## テスト

- テストコードを書くらしい。
- やったことない。

## Foundation

- アプリケーション用に、もとのlaravelのコードを少しいじったクラスや、オーバーライドしたクラスをここに置いてる。

# 開発時の Branch

- 以下の Branch 構成にする
  - main (リリース)
  - test (リリース前カスタマー確認・テスト等)
  - develop (開発用最新)
  - feature/\*\* (各機能開発用)
    - `**`には開発の内容に応じて任意の名前が入ります(例: `feature/new-feature`)
  - fix/\*\* (修正作業)
    - `**`には修正の内容に応じて任意の名前が入ります(例: `fix/some-bugs`)

# log の見方

- Docker Desktop の GUI 上で見ることもできる
- CLI から見る場合は下記のようにする

``` sh
# api logs
docker-compose logs --tail=400 -f api

# web front logs
docker-compose logs --tail=400 -f web
```

他にもログをみたいコンテナがあれば

``` sh
docker-compose logs --tail=400 -f ${コンテナ名}
```

のように指定すればok。

# コンテナ内部に入る

``` sh
docker-compose exec ${コンテナ名} bash
```

もしくは、コマンドを一つ実行するだけなら

``` sh
docker-compose exec ${コンテナ名} ${コマンド}
```

だけでもok。ただし、このときの実行ディレクトリはコンテナごとのworkDirの設定によって変わるので注意が必要。もし確認したければ以下のように実行するなりする。

``` sh
docker-compose exec ${コンテナ名} pwd
```

# 開発時導入必須(推奨)の VSCode 拡張機能

- [SwaggerViewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)
  - apiの仕様の確認に必要 
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - VSCode で ESLint のエラーを出せるのでほぼ必須です
  - 現在(2023/02/07)このプラグインをインストールするだけではエラーが出ない場合がある
    - 原因特定中
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - ファイル保存時にコードフォーマットを行うために必要
  - 本プロジェクトでは `prettier` を導入しているのでほぼ必須です
  - 導入しただけでは動作しないので設定が必要
    - [参考](https://ralacode.com/blog/post/vscode-prettier/)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
  - CSS in JS として `Linaria` を導入しているため`Styled-Components`のシンタックスハイライトや補完の為に必須
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
  - 必須ではないですが本プロジェクト以外でもオススメです
  - Git の各操作をグラフィカルに行えるプラグイン