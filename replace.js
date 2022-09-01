// replaceの対象となるテキスト ※任意でOK、他のコードと重複しないよう注意
const baseText = "__REPLACE__";
// 対象テキストを全て変換できるよう正規表現にしておく
const reg = new RegExp(baseText, "g");

// replace後のテキスト ※環境ごとに指定する
const newText = {
  dev: "開発環境",
  prod: "本番環境",
};

// 環境変数 ※上記newTextのキー（例：'dev'）と合うように環境変数ENVを定義する、未定義の場合は仮で'dev'としている
const env = process.env.ENV ?? "dev";

// 置換対象ディレクトリ
const src = "./sample/src/";

// 出力ディレクトリ
const dist = "./sample/";

// 置換対象ファイル ※複数ある場合は配列で指定する
const files = ["index.html"];

// ファイル操作のために必須
const fs = require("fs");

// 各ファイルに対して処理を実行
files.forEach((file) => {
  // ファイルを読み込む
  fs.readFile(src + file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // 対象のテキストを置換する、このときENVに渡した値を参照してnewTextが決まる
    const replaceFile = data.replace(reg, newText[env]);

    // ファイルの書き出し
    fs.writeFile(dist + file, replaceFile, "utf8", function (err) {
      if (err) return console.log(err);
      console.log(`${env}環境用に${src}${file}の置換成功`);
    });
  });
});
