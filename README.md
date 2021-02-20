# Nuxt_Tmdb（SSR）

deployed on https://nuxt-tmdb-firebase.herokuapp.com/

## 使用技術

Nuxt.js ^2.14.12  
Vuex  
Vuexfire ^3.0.1  
Vuetify ^1.11.3  
Ajax  
firebaseAuth  
firestore  
（firebase ^7.19.1）  
The Movie Database API  
Heroku

## こだわった点

・レスポンシブ対応していること。  
・vuex,vuexfire を使用し、値のやりとりをわかりやすくしたこと。  
.動的サイトにしたかったため、SSR を使用し、Heroku でデプロイしたこと。

## 苦労した点

・firestore について、user ごとのデータを保存する階層構造を実装方法の理解が難しかったこと。  
・LightHouse について、Performance を向上させる方法の思案が難しかったこと。

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
