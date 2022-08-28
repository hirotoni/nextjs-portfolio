---
title: "ポートフォリオサイトを自作してみた"
---

# 目次

- [目次](#目次)
- [動機](#動機)
- [技術スタック](#技術スタック)
- [作成の記録](#作成の記録)
  - [技術選定](#技術選定)
    - [React/Next.js](#reactnextjs)
    - [Tailwind CSS](#tailwind-css)
    - [Google App Engine](#google-app-engine)
  - [依存関係が直接的で、不要なファイルの放置が生まれにくい](#依存関係が直接的で不要なファイルの放置が生まれにくい)
  - [マークダウンから HTML への変換](#マークダウンから-html-への変換)

# 動機

転職活動するにあたって、個人のスキルを証明するものが欲しく、作成した。

始めのきっかけは、転職活動をしている中で、SaaS 企業などから Github アカウントの提出を求められたりした。
Github ではあまり活動していない手前、その会社は書類選考で落ちたが、そういえば自分のスキルをうまく証明できるものがないなと思った。

転職活動と並行しながら、現時点では以下の計画を考えている。

1. ポートフォリオサイトを自作する
2. ダミーの WEB サービスを作成してポートフォリオサイトで公開し、内部の設計や実装について詳述する

現時点ではポートフォリオとして披露するものは何もないが、将来的にも何かの役に立つであろうと思うので、自作したポートフォリオサイトは武器として持っておこうと思う。

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

# 作成の記録

作成していく中で思ったことを記述する。

## 技術選定

どの技術スタックを使うかについては、事前にある程度のゆるーい考えがあった。

### React/Next.js

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

### Tailwind CSS

CSS フレームワークの領域は、[Bootstrap](https://getbootstrap.com/)を使ったことがある。
私自身、普段はフロント開発ではないのであまり馴染みのない領域だが、すごいなと思う人の以下の１点のみで Tailwind の採用を決めた。

> 「[Tailwind's auto-purge feature is so powerful. The production CSS files are so small as a result.](https://youtu.be/GznmPACXBlY?t=572)」
>
> Takuya Matsuyama

このポートフォリオサイトもこの方の影響を大きく受けている。

### Google App Engine

Next.js のチュートリアルでは、Vercel をお薦めされる（Next.js の開発元のため）。

より汎用的なスキルを身につけるという目的で、ホスティングサービスは Google App Engine を選択した。

## 依存関係が直接的で、不要なファイルの放置が生まれにくい

React/Next.js を使った開発は初めてだったが、従来の WEB フレームワークと比較して嬉しい違いがあった。それは、役割が異なるファイル同士の依存関係を追いやすく、不要なファイルの特定がとても容易であることだ。これは、人の入れ替わりのある開発チームで長期間の開発が続くプロジェクトにとって、とても嬉しい。

順を追って説明する。

従来の WEB フレームワークでは以下のような**３つの役割がそれぞれ別ファイルに分かれている**。

Django（Python）での具体例

| ファイル名    | 役割                                                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| urls.py       | 公開する URL ＆ 内部処理を紐づけるマッピングを記述                                                                                             |
| views.py      | 内部処理を記述（MVC モデルだと Controller の役割）                                                                                             |
| template.html | レスポンスに使用する html の雛形を記述（MVC モデルだと View の役割）。template.html 同士での依存関係もある（例：共通レイアウトとコンテンツ）。 |

それぞれのファイルの依存関係を図示すると以下のようになるが、

> urls.py --- views.py --- template.html --- template.html

views.py と template.html、または template.html 同士の間は、python の言語仕様（import 句）ではなく、ファイル名の文字列を指定して紐付きを定義している。

各ファイルのサンプルコードは以下の通り。

> フォルダ構成
>
> ```plain
> urls.py
> views.py
> templates/
>   \_ article/
>        \_ base_layout.html
>        \_ 2003.html
> ```
>
> urls.py
>
> ```python
> from django.urls import path
>
> from . import views
>
> # ここにURLと内部処理のマッピングを記述
> urlpatterns = [
>     path('articles/2003/', views.article_2003),
> ]
> ```
>
> views.py
>
> ```python
> from django.shortcuts import render
>
> def article_2003(request):
>   # ここに内部処理を記述
>   section = getSection()
>   story = getStory()
>
>   # returnでレスポンスに使用するテンプレートhtmlのファイル名を指定
>   return render(request,
>                 'article/2003.html',
>                 {"section": section, "story": story})
> ```
>
> templates/article/2003.html
>
> ```django
> {% extends "base_layout.html" %}
> {% block title %}
>   {{ section.title }}
> {% endblock %}
>
> {% block content %}
>   <h1>{{ section.title }}</h1>
>   {% for story in story_list %}
>     <h2>
>       <a href="{{ story.get_absolute_url }}">
>         {{ story.headline|upper }}
>       </a>
>     </h2>
>     <p>{{ story.tease|truncatewords:"100" }}</p>
>   {% endfor %}
> {% endblock %}
> ```

ファイルの依存関係を python の import 句で定義していない場合、コードエディタのサポート（「Find All References」「Show Call Hierarcy」など）を受けにくい。
例えば、大きなシステムになってくると、views.py と template.html の数が多くなってくる。
そのような状況の中で、一つの template.html に修正を加えた場合、どの views.py に影響があるかを
コードエディタのサポートを頼りにせず、目視で追っていく必要がある。

フレームワークの仕様を理解して、ファイル名で grep をする作業になるが、**目視の作業割合がそれなりに大きい**ため、品質が不安定になりやすい作業である。

私が実際のプロジェクトで困っていたのは、１０年開発が続くプロダクトで、既にどこからも参照されていない不要なファイルが山積みになっていたことがある。開発速度重視なプロジェクトでは、手間のかかるお掃除は後回しにされがちである。

一方で、React/Next.js では、上記**３つの役割を一つのファイル（.jsx/.tsx ファイル） の中に押し込んでいる**。
（※URL はファイルの配置場所で自動的に決まる：[File-system Routing](https://nextjs.org/docs/routing/introduction)）

> サンプルコード：pages/index.tsx（[Github](https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/pages/index.tsx)）
>
> ```tsx
> import Head from "next/head";
> import { GetStaticProps } from "next";
> import Container from "../components/container";
> import MoreStories from "../components/more-stories";
> import HeroPost from "../components/hero-post";
> import Intro from "../components/intro";
> import Layout from "../components/layout";
> import { getAllPostsForHome } from "../lib/api";
> import { CMS_NAME } from "../lib/constants";
>
> export async function getStaticPaths() {
>   // ここに内部処理（ビルド時の処理）
> }
> export async function getStaticProps(context) {
>   // ここに内部処理（ビルド時の処理）
> }
> export async function getServerSideProps(context) {
>   // ここに内部処理（サーバ側）（views.pyの役割）
> }
> export default function Index({ allPosts: { edges }, preview }) {
>   // ここに内部処理（クライアント側）（views.pyの役割）
>   const heroPost = edges[0]?.node;
>   const morePosts = edges.slice(1);
>
>   // ここにレスポンスの雛形（template.htmlの役割）
>   return (
>     <Layout preview={preview}>
>       <Head>
>         <title>Next.js Blog Example with {CMS_NAME}</title>
>       </Head>
>       <Container>
>         <Intro />
>         {heroPost && (
>           <HeroPost
>             title={heroPost.title}
>             coverImage={heroPost.featuredImage}
>             date={heroPost.date}
>             author={heroPost.author}
>             slug={heroPost.slug}
>             excerpt={heroPost.excerpt}
>           />
>         )}
>         {morePosts.length > 0 && <MoreStories posts={morePosts} />}
>       </Container>
>     </Layout>
>   );
> }
> ```

文字列で紐付きを記述していたもの（views.py と template.html）が、同じファイル内に同居するようになった。また、ファイルの中で別のファイルに依存している場合もある。これも import でお互いの依存関係を記述するので、コードエディタの依存関係解決のサポートをフルに受けられる。

ファイルの一部や全部が不要になったら、コードエディタの「Find All References」「Show Call Hierarcy」などの機能を利用して依存関係を機械的に洗い出して
「これらのファイルに影響がある」「どこからも参照されていないのでこのファイルは削除して良い」などと安心して判断することができる。

文字列でお互いの依存関係を定義している仕組みよりかは、遥かに不要なファイルを特定することが容易く、どこからも参照されていないファイルが山積みになることが起きにくい。嬉しい。

## マークダウンから HTML への変換

マークダウンから HTML への変換の仕組みは Next.js のチュートリアルからそのまま流用した仕組みである。以下のパッケージを利用すると簡単に実装できる。今回はこの投稿機能をより読みやすいものにしたかったため、少し拡張した。

依存パッケージ：チュートリアルの成果物

- [remark](https://github.com/remarkjs/remark)
- [remark-html](https://github.com/remarkjs/remark-html)

依存パッケージ：拡張後

- [unified](https://github.com/unifiedjs/unified)
- [remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse)
- [remark-rehype](https://github.com/remarkjs/remark-rehype)
- [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize)
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
- [rehype-stringify](https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify)
- [rehype-slug](https://github.com/rehypejs/rehype-slug)
