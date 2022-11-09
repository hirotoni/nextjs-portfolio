---
title: "ポートフォリオサイトを自作してみた１：動機・技術スタック・技術選定"
published: true
tags: ["React", "Next.js", "Django", "web framework", "Tailwindcss", "GCP"]
---

# 目次

- [目次](#目次)
- [動機](#動機)
- [技術スタック](#技術スタック)
- [技術選定](#技術選定)
  - [React/Next.js](#reactnextjs)
  - [Tailwind CSS](#tailwind-css)
  - [Google App Engine](#google-app-engine)

# 動機

転職活動するにあたって、個人のスキルを証明するものが欲しく、作成した。

始めのきっかけは、転職活動をしている中で、SaaS 企業などから Github アカウントの提出を求められたりした。
Github ではあまり活動していない手前、その会社は書類選考で落ちたが、そういえば自分のスキルをうまく証明できるものがないなと思った。

転職活動と並行しながら、現時点では以下の計画を考えている。

1. ポートフォリオサイトを自作する
2. ダミーの WEB サービスを作成してポートフォリオサイトで公開し、内部の設計や実装について詳述する

現時点ではポートフォリオとして披露するものは何もない。当面は個人的なブログとしての運用がメインになると思う。

# 技術スタック

このポートフォリオサイトの技術スタックは以下の通り。

| 分類               | 技術スタック                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------- |
| WEB フレームワーク | [React](https://reactjs.org/) / [Next.js](https://nextjs.org/)                               |
| CSS フレームワーク | [Tailwind CSS](https://tailwindcss.com/)                                                     |
| ホスティング       | [Google App Engine (Standard Environment)](https://cloud.google.com/appengine/docs/standard) |

今回は静的なコンテンツを提供することが目的のため、バックエンドのアプリケーションは必要にならない。

このポートフォリオサイトでは投稿機能を実装している（このエントリのこと）。投稿は markdown ファイルで作成・管理する。投稿を保存するためのデータベースは設けていない。Next.js ビルド時に markdown ファイルを静的な HTML に変換する仕組みとしている。
この仕組みは [Next.js のチュートリアル](https://nextjs.org/learn/foundations/about-nextjs)をこなすと基本実装が確認できる。

負荷分散の仕組みやサーバ構成周りは完全に App Engine スタンダート環境に任せている。

サーバ証明書の取得、ドメイン（hirotoni.com）の取得・設定などもまた Google Cloud Console を通して行った。

ソースコードは Github にて公開しており、[こちら](https://github.com/hirotoni/nextjs-portfolio)で確認できる。

# 技術選定

どの技術スタックを使うかについては、事前にある程度のゆるーい考えがあった。

## React/Next.js

似たもので Vue/Nuxt.js があるが、React/Next.js を選択した理由は以下の通り。

1. 開発コミュニティの規模が、React が最大である
2. 私自身が、React Native を触ったことがあり、React にも既に馴染みがあった
3. 私自身が、翻訳に頼らずとも英語が理解できるため、Vue の日本語のドキュメントの豊富さに頼らなくても良い
4. Vue の SFC（Single File Component）の構文が特殊で、コードエディタなどのサポートが弱い（弱かった）

基本的には、開発コミュニティの規模が大きいフレームワークほど、その技術を取り巻く環境の変化に追随して進化でき、新しいメリットを享受できる。
開発体験やシステムの安定性などにつながってくるため、新規システムの技術選定をするときは、これから先も時代の変化にあわせて進化できるのかどうかは重要だと思う。

日本では Vue がものすごく人気で、書店でも Vue の日本語の参考書をとてもよく見かける。転職活動でいろんな会社の技術スタックを見る機会があったが、React よりも Vue を採用しているところの方が多かった。

Vue では SFC（Single File Component）のフレームワーク設計によって、html と css と javascript のコードを１ファイルに押し込むことができる。
この仕組みが従来の WEB フロント開発者だけでなく、WEB フロント開発に慣れていない入門者にとってもわかりやすいもので、よく入門者にお薦めされているのを見かける。

> Vue のサンプルコード
>
> ```xml
> <script>
> export default {
>   data() {
>     return {
>       greeting: "Hello World!",
>     };
>   },
> };
> </script>
>
> <template>
>   <p class="greeting">{{ greeting }}</p>
> </template>
>
> <style>
> .greeting {
>   color: red;
>   font-weight: bold;
> }
> </style>
> ```

私自身も 2019 年ごろに Vue を触ってみたことがある。その当時は html,js,css について初心者だったので Vue のおかげでフロント開発についてたくさん学ぶきっかけを作ってくれた恩がある。しかし当時の思い出としては、

- SFC をサポートする構文ハイライトが弱かった
- 当時はまだ開発コミュニティが大きくなく、Vue 周辺のパッケージが弱かった

の印象が強く、個人的にはあまり開発体験をよく感じなかった。
2022 年現在では Vue を取り巻く環境が全く異なるかもしれないが、開発コミュニティが最大のものを選んで悪いことはないので、今回は React を選択した。

## Tailwind CSS

私自身、普段はフロント開発ではないのであまり馴染みのない領域だが、すごいなと思う人の以下の１点のみで Tailwind の採用を決めた。

CSS フレームワークの領域は、[Bootstrap](https://getbootstrap.com/)を使ったことがある。
Bootstrap と使い心地が似ている。

> 「[Tailwind's auto-purge feature is so powerful. The production CSS files are so small as a result.](https://youtu.be/GznmPACXBlY?t=572)」
>
> Takuya Matsuyama

## Google App Engine

Next.js のチュートリアルでは、Vercel をお薦めされる（Next.js の開発元のため）。

より汎用的なスキルを身につけるという目的で、ホスティングサービスは Google App Engine を選択した。
