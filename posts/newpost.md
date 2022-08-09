---
title: "ポートフォリオサイトを自作してみた"
date: "2022-08-04"
---

# 目次

- [目次](#目次)
- [動機](#動機)
- [技術スタック](#技術スタック)
- [作成の記録](#作成の記録)
  - [技術選定](#技術選定)
    - [WEB フレームワーク：React/Next.js](#web-フレームワークreactnextjs)
    - [CSS フレームワーク：Tailwind CSS](#css-フレームワークtailwind-css)
    - [ホスティング：Google App Engine](#ホスティングgoogle-app-engine)
  - [依存関係を追いやすく、不要なファイルの放置が生まれにくい](#依存関係を追いやすく不要なファイルの放置が生まれにくい)
  - [マークダウンから HTML への変換](#マークダウンから-html-への変換)

# 動機

転職活動するにあたって、個人のスキルを証明するものが欲しく、作成した。

始めのきっかけは、転職活動をしている中で、SaaS 企業などから Github アカウントの提出を求められたりした。
Github ではあまり活動していない手前、その会社は書類選考で落ちたが、そういえば自分のスキルをうまく証明できるものがないなと思った。

転職活動と並行しながら、現時点では以下の計画を考えている。

1. ポートフォリオサイトを自作する
2. ダミーの WEB サービスを作成してポートフォリオサイトで公開し、内部の設計や実装について詳述する

現時点ではポートフォリオとして披露するものは何もないが、将来的にも何かの役に立つであろうと思うので、自作したポートフォリオサイトは武器として持っておこうと思う。

このエントリは、１段目のポートフォリオサイトの自作がひと段落ついた時に作成している。

# 技術スタック

このポートフォリオサイトの技術スタックは以下の通り。

- WEB フレームワーク：[React](https://reactjs.org/) / [Next.js](https://nextjs.org/)
- CSS フレームワーク：[Tailwind CSS](https://tailwindcss.com/)
- ホスティング：[Google App Engine (Standard Environment)](https://cloud.google.com/appengine/docs/standard)

今回は静的なコンテンツを提供することが目的のため、バックエンドのアプリケーションは必要にならない。

このポートフォリオサイトでは投稿機能を実装している（このエントリのこと）。投稿を保存するためのデータベースは設けていない。
投稿はマークダウンファイルで作成しておき、それを Next.js ビルド時に 静的な HTML に変換する仕組みとしている。
（この仕組みは [Next.js のチュートリアル](https://nextjs.org/learn/foundations/about-nextjs)の成果物からそのまま流用した）

負荷分散の仕組みやサーバ構成周りは完全に App Engine スタンダート環境に任せている。

サーバ証明書の取得、ドメインの取得・設定などもまた Google Cloud Console を通して行った。

# 作成の記録

このポートフォリオサイトを自作していく中で、思ったことを徒然なるままに記録する。

## 技術選定

どの技術スタックを使うかについては、事前にある程度のゆるーい考えがあった。

### WEB フレームワーク：React/Next.js

似たもので Vue/Nuxt.js がある。

React を選択した理由は以下の通り。

1. 開発コミュニティの規模が、React が最大
2. 私自身が、React Native を触ったことがあり、React にも既に馴染みがあった
3. 私自身が、Vue の日本語のドキュメントの豊富さに頼らなくても良い
4. Vue の SFC（Single File Component）の構文が特殊で、コードエディタなどのサポートが弱い（弱かった）

日本では Vue がものすごく人気で、書店でも Vue の日本語の参考書をとてもよく見かける。
Vue では SFC（Single File Component）のフレームワーク設計によって、html と css と javascript のコードを１ファイルに押し込むことができる。
この仕組みが従来の WEB フロント開発者だけでなく、WEB フロント開発に慣れていない入門者にとってもわかりやすいもので、よく入門者にお薦めされているのを見かける。

> Vue のサンプルコード
>
> ```vue
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

私自身も 2019 年ごろに Vue を触ってみたことがある。その当時は html,js,css について初心者だったので Vue のおかげでたくさん学んだ節がある。しかし当時の思い出としては、

- SFC をサポートする構文ハイライトが弱かった
- 当時はまだ開発コミュニティが大きくなく、Vue 周辺のパッケージが弱かった

記憶があり、個人的にはあまり開発体験はよく感じなかった。2022 年現在では環境が異なるかもしれないが、開発コミュニティが最大のものを選んで悪いことはないので、今回は React を選択した。

### CSS フレームワーク：Tailwind CSS

私自身、普段はフロント開発ではないのであまり馴染みのない領域だが、すごいなと思う人の以下の１点のみで採用を決めた。

- 「[production ビルド後の CSS ファイルのサイズがめちゃくちゃ小さい](https://youtu.be/GznmPACXBlY?t=572)」

### ホスティング：Google App Engine

Next.js のチュートリアルでは、Vercel をお薦めされる（Next.js の開発元のため）。

より汎用的なスキルを身につけるという目的で、ホスティングサービスは Google App Engine を選択した。

## 依存関係を追いやすく、不要なファイルの放置が生まれにくい

React/Next.js を使った開発は初めてだったが、従来の WEB フレームワークと比較して嬉しい違いがあった。それは、役割が異なるファイル同士の依存関係を追いやすく、不要なファイルの特定がとても容易であることだ。これは、人の入れ替わりのある開発チームで長期間の開発が続くプロジェクトにとって、とても嬉しい。

順を追って説明する。

従来の WEB フレームワークでは以下のような**３つの役割がそれぞれ別ファイルに分かれている**。

Django（Python）での具体例

- urls.py: 公開する URL と、レンダリング前処理を紐づけるマッピングを記述
- views.py: レンダリング前処理を記述（MVC モデルだと Controller の役割）
- template.html: レンダリングに使用する html の雛形を記述（MVC モデルだと View の役割）

そして、**お互いの依存関係を、ファイル名の文字列で定義している箇所がある**（views.py と template.html の間）。

> urls.py
>
> ```python
> from django.urls import path
>
> from . import views
>
> # ここにURLとレンダリング前処理のマッピングを記述
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
>   # ここにレンダリング前処理を記述
>   section = getSection()
>   story = getStory()
>
>   # returnでテンプレートhtmlを指定
>   return render(request,
>                 'article/2003.html',
>                 {"section": section, "story": story})
> ```
>
> article/2003.html
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

これで課題となるのは、コードエディタの依存関係解決のサポートを受けにくく、どのファイルがどのファイルに影響があるかを、目視でファイル同士の紐付きを追っかけて確認する必要がある。
urls.py <-> views.py <-> template.html の間を行ったり来たり、ファイル名で grep してみたりという作業になる。

フレームワークの仕様を理解していれば難しい作業ではないが、**目視の作業割合がそれなりに大きい**ため、品質が不安定になりやすい作業である。

私が実際のプロジェクトで困っていたのは、１０年開発が続くプロダクトで、既にどこからも参照されていない不要なファイルが山積みになっていたことがある。開発速度重視なプロジェクトでは、手間のかかるお掃除は後回しにされがちである。

一方で、React/Next.js では、上記**３つの役割を一つの module（.jsx/.tsx ファイル） の中に押し込んでいる**。

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
> export default function Index({ allPosts: { edges }, preview }) {
>   // ここにレンダリング前処理（views.pyの役割）
>   const heroPost = edges[0]?.node;
>   const morePosts = edges.slice(1);
>
>   // ここにレンダリングの雛形（template.htmlの役割）
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

文字列で紐付きを記述していたもの（views.py と template.html）が、同じ module 内に同居するようになった。また、module の中で別の module を import している場合もある。これも import/export でお互いの依存関係を記述するので、コードエディタの依存関係解決のサポートをフルに受けられる。

module の一部や全部が不要になったら、コードエディタの「Find All References」「Show Call Hierarcy」などの機能を利用して依存関係を機械的に洗い出して
「これらの module に影響がある」「どこからも参照されていないのでこの module は削除して良い」などと安心して判断することができる。

文字列でお互いの依存関係を定義している仕組みよりかは、遥かに不要なファイルを削除しやすい。

ここまでにおいて、urls.py に相当する役割について言及していないが、これについて Next.js では、[File-system Routing](https://nextjs.org/docs/routing/introduction)の仕組みで、ファイル名とそのファイルの配置場所で URL が自動的に決まる。

> **Index routes**
>
> The router will automatically route files named index to the root of the directory.
>
> ```
> pages/index.js → /
>
> pages/blog/index.js → /blog
> ```
>
> **Nested routes**
>
> The router supports nested files. If you create a nested folder structure, files will automatically be routed in the same way still.
>
> ```
> pages/blog/first-post.js → /blog/first-post
>
> pages/dashboard/settings/username.js → /dashboard/settings/username
> ```
>
> 引用：[Next.js: Routing](https://nextjs.org/docs/routing/introduction)

そのため、module（.jsx/.tsx ファイル）一つで、urls.py、views.py、template.html の管理がいっぺんにでき、一石三鳥となっている。

以上の機能から、
従来の WEB フレームワークでは目視で地道にファイル同士の紐付きを追う必要があったのが、React/Next.js ではその手間が不要となるので、どこからも参照されていないファイルが山積みになることが起こりにくい。嬉しい。

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

一つつまづいた点は、コードブロックの構文ハイライトの付与についてである。

rehype-highlight は、コードブロックに構文ハイライトを付与することができるパッケージである。
しかし TailwindCSS と組み合わせると、リセット CSS のおかげで全ての修飾が無かったことになってしまった。

対応として、コードにクラスを付与してくれるところまでは生きているので、これを頼りに自分で styles/global.css による修飾をあてた。実際にあてたカラーコードは、[vscode の設定](https://code.visualstudio.com/docs/getstarted/themes#:~:text=Developer%3A%20Generate%20Color%20Theme%20From%20Current%20Settings%20command)を拝借して設定した。
付与されるクラスの種類が多いので、全てを網羅した設定はしておらず、おいおい欲しくなったときに欲しい修飾を追加していく。

> クラスが付与された実際の HTML 出力
>
> ```html
> <div class="markdown">
>   ...省略...
>   <pre>
>     <code class="hljs language-python">
>       <span class="hljs-keyword">from</span> django.shortcuts
>         <span class="hljs-keyword">import</span> render
>         <span class="hljs-keyword">def</span>
>         <span class="hljs-title function_">article_2003</span>
>         (
>         <span class="hljs-params">request</span>
>         ):
>         <span class="hljs-comment"># ...ここにレンダリング前処理を記述...</span>
>         ...省略...
>   </pre>
> </div>
> ```
>
> styles/global.css
>
> ```css
> .markdown pre {
>   @apply bg-slate-800 my-2 p-3 rounded overflow-x-auto;
> }
> .markdown code {
>   color: white;
> }
> .markdown code .hljs-comment {
>   color: #6A9955;
> }
> .markdown code .hljs-keyword {
>   color: #b267e6;
> }
> ...省略...
> ```
>
> 実際のコードブロックの見え方
>
> ```python
> from django.shortcuts import render
>
> def article_2003(request):
>   # ...ここにレンダリング前処理を記述...
> ```
