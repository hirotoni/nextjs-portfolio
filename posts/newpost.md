---
title: "ポートフォリオサイトを自作してみた"
date: "2022-08-04"
---

# 目次

- [目次](#目次)
- [動機](#動機)
- [技術スタック](#技術スタック)
- [作成の記録](#作成の記録)
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

自分の経歴的にはバックエンドが中心であるため、自分がより得意な領域の活動は２段目からとなる。

# 技術スタック

このポートフォリオサイトの技術スタックは以下の通り。

- WEB フレームワーク：[React](https://reactjs.org/) / [Next.js](https://nextjs.org/)
- CSS フレームワーク：[Tailwind CSS](https://tailwindcss.com/)
- ホスティング：[Google App Engine (Standard Environment)](https://cloud.google.com/appengine/docs/standard)

今回は静的なコンテンツを提供することが目的のため、バックエンドのアプリケーションは必要にならない。

投稿機能を実装している（このエントリのこと）。投稿を保存するためのデータベースは設けていない。
投稿はマークダウンファイルで作成しておき、それを Next.js ビルド時に 静的な HTML に変換する仕組みとしている。
（この仕組みは [Next.js のチュートリアル](https://nextjs.org/learn/foundations/about-nextjs)の成果物からそのまま流用した）

負荷分散の仕組みやサーバ構成周りは完全に App Engine スタンダート環境に任せている。

サーバ証明書の取得、ドメインの取得・設定などもまた Google Cloud Console を通して行った。

# 作成の記録

このポートフォリオサイトを自作していく中で、思ったことを徒然なるままに記録する。

## 依存関係を追いやすく、不要なファイルの放置が生まれにくい

従来の WEB フレームワークを使っていて実際に困っていた課題が、React/Next.js では生じない点に感心した。

順を追って説明する。

従来の WEB フレームワークでは以下のような**３つの役割がそれぞれ別ファイルに分かれている**。

Django（Python）での具体例

- urls.py: アプリケーションで公開する URL と、レンダリング前処理を紐づけるマッピングを記述
- views.py: レンダリング前処理を記述。レンダリングに使用する template.html を return で指定。
- template.html: レンダリングに使用する html の雛形を記述

そして、**お互いの依存関係**をクラス同士の依存関係ではなく、**文字列で定義している**。

> urls.py
>
> ```python
> from django.urls import path
>
> from . import views
>
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
>   # ...ここにレンダリング前処理を記述...
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

私が実際のプロジェクトで困っていたのは、１０年開発が続くプロダクトで、このような手間のかかる依存関係の仕組みが拍車をかけて、既にどこからも参照されていない不要なファイルが山積みになっていたことがある。開発速度重視なプロジェクトでは、手間のかかるお掃除は後回しにされがちである。

一方で、React/Next.js では、上記**３つの役割を一つの module（.jsx ファイル） の中に押し込んでいる**。
（自分で書いておいて、ここは端的にまとめ過ぎている感はある。）

また、module 同士の依存関係もある。これも import/export でお互いの依存関係を記述するので、コードエディタの依存関係解決のサポートをフルに受けられる。

あとは想像に易しいと思うが、module の一部や全部が不要になったら、コードエディタの「Go to References」などの機能を利用して参照箇所（影響範囲）を特定し、
「これらの module に影響がある」「どこからも参照されていないのでこの module は削除して良い」などと安心して判断することができる。

文字列でお互いの依存関係を定義している仕組みよりかは、遥かに不要なファイルを削除しやすい。

## マークダウンから HTML への変換

マークダウンから HTML への変換の仕組みは Next.js のチュートリアルからそのまま流用した仕組みであるが、この投稿機能をより読みやすいものにしたかったため、少し拡張した。

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
付与されるクラスの種類が多いので、全てを網羅した設定はしていない。

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
