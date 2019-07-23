# 久しぶりにVueプロジェクト

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
