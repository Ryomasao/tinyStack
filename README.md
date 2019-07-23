# 久しぶりにVueプロジェクト
以下の記事を参考に、webpack-dev-serverでhotreloadするとこまでやった
https://itnext.io/vuejs-and-webpack-4-from-scratch-part-1-94c9c28a534a
https://itnext.io/vue-js-and-webpack-4-from-scratch-part-2-5038cc9deffb
https://itnext.io/vue-js-and-webpack-4-from-scratch-part-3-3f68d2a3c127


やはり抜群にわかりやすい
https://ics.media/entry/16028/#

## Lint
参考にさせていただいた記事
https://alligator.io/vuejs/vue-eslint-plugin/

```
$ yarn add --dev eslint eslint-plugin-vue
```

.eslintrc.json
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "plugins": [],
  "parserOptions": {},
  "env": {"browser": true},
  "globals": {},
  "rules": {}
}
```

.vscode/settings.json
```json
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "vue",
        "autoFix": true
    }
]
```

## Prettier
参考にさせていただいた記事
https://alligator.io/vuejs/vue-eslint-prettier/

```
$ yarn global add  prettier
```

```
$ yarn add --dev eslint-plugin-prettier eslint-config-prettier
```

.eslintrc.json
```json
{
  "extends": [
    "plugin:vue/essential",
    "plugin:prettier/recommended",
    "eslint:recommended"
  ],
  "plugins": [],
  "parserOptions": {},
  "env": {"browser": true},
  "globals": {},
  "rules": {}
}
```

これで、`eslint --fix targetPath`でコードフォーマットが走る

## 保存時にeslit --fixする
参考にさせていただいた記事
https://qiita.com/fukasawah/items/cfff8957f3956850dc7e

.vscode/settings.json
```json
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "vue",
        "autoFix": true
    }
]
```

`formatOnSave:true`にするとeslint --fixとは別の?prettierが起動しちゃって.vue編集時に競合が発生しちゃうみたい。  
自分の設定だと、以下のように対象を絞ってるから問題ないかも。
```
   "[javascript]": {
        "editor.formatOnSave": true
      },
    "[typescriptreact]": {
        "editor.formatOnSave": true
      }
```


デフォルトの設定で、文字列がダブルクォートになっていたので、カスタマイズする

..prettierrc
```js
{
  "singleQuote": true,
  "semi": false
}
```

## jest + vue-testing-library

```
$ yarn add --dev jest vue-testing-library
```

### Babelの設定を変更

最初、Babelの設定に、ES6で書かれたものを、他の文法に変換する設定`modules:false`がoffになっていた
その設定を削除した。削除すると`modules:auto`になるとのこと。
jest実行時には、ES6をcommon.jsに変換する必要がある。
autoにしておくと、babel-loaderから呼ばれた場合(=webpackから実行？)は、falseで、それ以外はcommon.jsに変換するとのこと
https://github.com/babel/babel/pull/8485/files/d60c5e1736543a6eac4b549553e107a9ba967051

```
{
  "presets": ["@babel/preset-env"]
}
```


### jestでlintエラーがでるので対応
↓の設定をそのままもってきた
https://www.npmjs.com/package/eslint-plugin-jest

```
$ yarn add --dev eslint-plugin-jest
```

.eslintrc.json
```json
{
  "extends": [
    "plugin:vue/essential",
    "plugin:prettier/recommended",
    "eslint:recommended"
  ],
  "plugins": ["jest"],
  "parserOptions": {},
  "env": {"browser": true},
  "globals": {},
  "rules": {}
}
```

### とりあえず試してみる

App.test.js
```js
import { render } from 'vue-testing-library'
import App from './App.vue'

it('render App', () => {
  const { getByTestId } = render(App)
  expect(getByTestId('app')).toBeInTheDocument()
})
```

しかし、.vueをjsに変換しているのは、webpackのvue-loader、jestはwebackと関係ない世界なので、どうするのかしら。  

`vue-jest`というプリプロセッサがあるみたい。
ただ、vue-loaderと100%と同じ機能を持っていないという不穏な気配が、、、
https://vue-test-utils.vuejs.org/ja/guides/#%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%83%92%E3%83%B3%E3%83%88


ひとます、公式の設定を試そう
https://www.npmjs.com/package/vue-testing-library

```
yarn add --dev vue-jest babel-jest 
```

jest.config.js
```js
module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'vue'],
  testPathIgnorePatterns: ['/node_modules/'],
  // jest実行時にコンパイルする
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  }
}
```

これで`yarn jest`をしてみたところ、`babel/core`がねえっていわれちゃう。 
vue-jestのpeerDependeciesにbabel/coreと書いてある。
一方、babel7から@babel...にパッケージ名がかわっており、これはインストール済。babel/coreをいれたらいいのかしらともおもったけど、↓をつかえばいいみたい。
https://github.com/babel/babel-bridge

いまいちよくわからないけど、インストールしたらうまくいった。

あー、babel-coreとして入るんだね
```
"babel-core": "7.0.0-bridge.0",
```


babelに関しては公式を眺めた後この記事をみるとわかりやすい
https://aloerina01.github.io/blog/2018-03-19-1


babelのポリフィルを使いたい場合、
* webpackで、バンドル時に結合する
* エントリーポインチでimport babel-polyfillを使う
   (+ babel7のbuiltInOptionを使うと必要なものだけバンドル)
* transform-runtimeがある
  最後のやつちょっと謎。足りない機能を埋め込みじゃなくって、コードそのものを書き換えにいくみたい。  



