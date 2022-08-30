---
title: "ポートフォリオサイトを自作してみた２：作成の記録"
---

# 目次

- [目次](#目次)
- [作成の記録](#作成の記録)
  - [依存関係が直接的で、不要なファイルの放置が生まれにくい](#依存関係が直接的で不要なファイルの放置が生まれにくい)

# 作成の記録

ポートフォリオサイトを自作した。

（[前回の記事](../2022-08-19/makingportfolio1)）

作成していく中で思ったことを記述する。

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

具体的にどのような場面で困るかというと、例えば、大きなシステムになってくると、views.py と template.html の数が多くなってくる。
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
