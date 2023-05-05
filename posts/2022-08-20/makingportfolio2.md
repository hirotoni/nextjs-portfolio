---
title: "ポートフォリオサイトを自作してみた２：作成の記録"
published: true
tags: ["React", "Next.js", "Django", "web framework"]
---

# 目次

- [目次](#目次)
- [作成の記録](#作成の記録)
  - [不要なファイルの特定が容易](#不要なファイルの特定が容易)
    - [従来の WEB フレームワークの課題](#従来の-web-フレームワークの課題)
    - [Django の場合](#django-の場合)
    - [React/Next.js の場合](#reactnextjs-の場合)

# 作成の記録

ポートフォリオサイトを自作した。（[前回の記事](../2022-08-19/makingportfolio1)）

作成していく中で思ったことを記述する。

## 不要なファイルの特定が容易

### 従来の WEB フレームワークの課題

従来の WEB フレームワークでも十分便利であることを前置きした上で、React で開発してみたところ、次の点に気付かされた。従来の WEB フレームワークはファイル間の依存関係を文字列で定義している部分があり、この場合、コードエディタのサポートを受けることができず、ファイル数が多くなってくるとファイル同士の依存関係が管理できなくなる。

| WEB フレームワーク    | ファイル間の依存関係の定義の仕方 |
| --------------------- | -------------------------------- |
| React                 | 全て import で依存関係を定義する |
| Django や Spring など | 文字列で定義する箇所がある       |

### Django の場合

ユーザからのリクエストを処理してレスポンスを返すまでの間に、以下のような概念が存在する。
WEB フレームワークを利用して開発することで、この概念の実装を簡単にしてくれる。

- リクエスト URL に紐づく内部処理を解決する
- 内部処理を実行する（DB からデータを取得したりなど）
- 内部処理に紐づく雛形（html のテンプレート）を解決する
- 内部処理の実行結果 & 雛形を用いて html を生成する

Django を例に取ると、以下のファイルを作成することとなる。WEB アプリケーションの機能数や画面数が多くなるにつれて、主に views.py や template.html のファイル数が増えていく。

| ファイル名    | 役割                                                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| urls.py       | 公開する URL ＆ 内部処理を紐づけるマッピングを記述                                                                                           |
| views.py      | 内部処理を記述（MVC モデルの Controller の役割）                                                                                             |
| template.html | レスポンスに使用する html の雛形を記述（MVC モデルの View の役割）。template.html 同士での依存関係もある（例：共通レイアウトとコンテンツ）。 |

それぞれのファイルの依存関係を図示すると以下のようになるが、views.py と template.html、また template.html 同士は、**ファイル名の文字列を指定して紐付きを定義している**。

> urls.py --- views.py --- template.html --- template.html

各ファイルのサンプルコードで確認できる。（説明のために簡略化している部分あり）

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
>                 'article/2003.html',  # <-- 紐づけるhtmlファイルを文字列で指定
>                 {"section": section, "story": story})
> ```
>
> templates/article/2003.html
>
> ```django
> {% extends "base_layout.html" %} {# <-- 紐づけるhtmlファイルを文字列で指定 #}
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

サンプルコードの例では、以下の間の紐付きはファイル名の文字列で定義されている。

- article_2003()と 2003.html
- base_layout.html と 2003.html

具体的にどのような場面で困るかというと、例えば、大きなシステムになってくると、views.py と template.html の数が多くなってくる。
そのような状況の中で、一つの template.html に修正を加えた場合、連鎖的にどの views.py や別の template.html に影響があるかを
コードエディタのサポートを頼りにせず、目視で追っていく必要がある。

フレームワークの仕様を理解して、ファイル名で grep をする作業になるが、**目視の作業割合がそれなりに大きい**ため、品質が不安定になりやすい作業である。

私が実際のプロジェクトで困った経験があり、１０年開発が続くプロダクトで、既にどこからも参照されていない不要なファイルが山積みになっていたことがある。開発速度重視なプロジェクトでは、このような手間のかかるお掃除は後回しにされがちで、これが原因で不要なファイルが山積みになってしまう。

### React/Next.js の場合

一方で、React/Next.js では、上記**３つの役割を一つのファイル（.jsx/.tsx ファイル） の中に押し込んでいる**。

（※URL は pages フォルダ配下のファイルの配置場所とファイル名で自動的に決まる：[File-system Routing](https://nextjs.org/docs/routing/introduction)）

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

React および Next.js では、[JSX](https://reactjs.org/docs/introducing-jsx.html)の記法を取り入れることで、Javascript のコードの中に、html を書き込むことも可能になり、内部処理と html を一つのファイルで管理することができるようになる。（ここに限って「内部処理」とは、画面生成のためのサーバ/クライアントで実行する動的な処理全てのこと）

[こちらの動画](https://www.youtube.com/watch?v=x7cQ3mrcKaY)に JSX が生まれた経緯が解説されている。要約すると、「関心の分離」を再考した結果、display logic と markup は結合度が高く同じ場所にあるべきとのこと。従来の Javascript と html を別ファイルに分けて、画面右側で html ファイルを開きながら左側で Javascript ファイルを開いて全く別のことをしているのは良くないという。確かに納得させられる。

JSX で記述することによって、内部処理と html を一つに合わせた module として扱えるようになった。これによりお互いの依存関係を import の関係で記述することができるようになったため、ファイルの一部や全部が不要になったら、コードエディタの「Find All References」「Show Call Hierarcy」などの機能を利用して依存関係を**漏れなく機械的に**洗い出すことができる。

文字列でお互いの依存関係を定義している仕組みよりかは、遥かに不要なファイルを特定することが容易く、どこからも参照されていないファイルが山積みになることが起きにくい。嬉しい。
