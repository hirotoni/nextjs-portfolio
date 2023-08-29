---
title: Github Actions から Google App Engine にデプロイしてみた
published: true
tags: ["CICD", "Github", "Github Actions", "GCP"]
---

# 目次

- [目次](#目次)
- [冒頭](#冒頭)
- [必要な知識](#必要な知識)
- [概要を掴む](#概要を掴む)
- [references](#references)

# 冒頭

現在見ているこのサイトのデプロイを Github Actions を使って自動的に Google App Engine へ行うように仕組みを構築してみた。

今まではローカルから gcloud cli を使って直接デプロイしていた。そうするとデプロイ時点でのローカルの資材がデプロイされるため、必ずしもレポジトリの最新の内容がデプロイされているとは限らなかった。

職場では Gitlab と AWS で CICD が構築されているが、その「見たことある」を頼りに、Github と GCP で同じものを自身で構築してみた。

実現したいことは、master ブランチに PR がマージされたタイミングでビルドとデプロイが自動的に実行されて欲しい。全体では以下のような流れにする。

1. ローカルで修正したブランチを Github 上に push する
2. Github 上で PR を作る
3. PR を master ブランチにマージする
4. Github Actions が master ブランチへのマージを検知してビルドとデプロイを実行する

# 必要な知識

いろんなドキュメントを見ながら手探りで一通りやってみて、以下の知識がついた（必要だった）。

- Github Actions
- Github Actions の GAE プラグイン
- IAM の知識
- Workload Identity pools の知識

作業の順番

- Github Actions を定義する
- GCP 側を構築する
- Github Actions と GCP を結合する
- 権限不足のエラーログを見ながら必要な権限周りをつけるトライアンドエラー

# 概要を掴む

まずは、公式のドキュメントを読んで概要を掴む。

- [GitHub Actions からのキーなしの認証の有効化](https://cloud.google.com/blog/ja/products/identity-security/enabling-keyless-authentication-from-github-actions?hl=ja)
- [Configuring OpenID Connect in Google Cloud Platform](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-google-cloud-platform)

書くのに力尽きたので、この続きは気が向いたらいつか続きを書く。

# references

- [About security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Configuring OpenID Connect in Google Cloud Platform](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-google-cloud-platform)
- [Workload Identity 連携を構成する](https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines?hl=ja#configure)
- [GitHub Actions からのキーなしの認証の有効化](https://cloud.google.com/blog/ja/products/identity-security/enabling-keyless-authentication-from-github-actions?hl=ja)
- https://christina04.hatenablog.com/entry/workload-identity-federation
- https://medium.com/google-cloud/how-does-the-gcp-workload-identity-federation-work-with-github-provider-a9397efd7158
