# Node.js でファイル内のテキストを置換する

## 前提、使いドコロ

- HTML 内で読み込むファイルを本番環境とステージング環境で違うパスにしたい
- JavaScript で参照する API のパスを本番環境とステージング環境で切り替えたい
- CSS 内で使う画像パスを本番環境とステージング環境で違うものにしたい

こういった状況で更新のたびに手動でテキストを書き換えるのは手間であり、また人的ミスが発生するリスクも高まるため、コミット時や build 時にまとめて Node.js で処理する。

## 設定方法

[replace.js](https://github.com/chinen-octtn/ReplaceTextWithNodeJS/blob/main/replace.js) を参照

- baseText: 変換対象となるテキストを指定・・・Sample では `__REPLACE__`
- newText: replace 後のテキストを環境ごとに記述する
- サーバー側で環境変数を ENV に指定する（できない場合は後述のコマンド側で指定）
- src: 置換対象のファイルを置いているディレクトリを指定する
- dist: 置換後のファイルを出力するディレクトリを指定する
- files: 置換対象のファイル名を配列で指定する

## 実行手順

replace.js をダウンロードし、開発環境に合わせて上記の設定後、任意のディレクトリに設置する。

置換を実行したいタイミングで node で実行する。

ルート直下に置いた場合は下記で実行できる。※Node.js が動く環境が必要

```
node replace.js
```

### おすすめの実行タイミング

- タスクランナーの build 時
- Git フックの pre-commit などプッシュ時
- GitHub Actions など CI 実行時
- Next.js/Nuxt 等のビルド時

例）Nuxt で SSG したあとに置換したい場合
package.json の generate コマンドを下記のように変更する

```
"generate": "nuxt generate && node replace.js",
```

### 補足

サーバー側の環境変数で実行環境の情報を渡す想定。（本番環境なら 'prod' 、ステージングなら 'dev' など）

環境変数の指定ができない場合は、コマンドの実行時に渡す。

```
// 本番用に実行したい場合の例
ENV=prod node replace.js
```
