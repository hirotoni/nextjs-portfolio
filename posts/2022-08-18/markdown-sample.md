---
title: マークダウンの見た目調整用エントリ
published: false
---

# table of contents

- [table of contents](#table-of-contents)
- [unordered list](#unordered-list)
- [ordered list](#ordered-list)
- [table](#table)
  - [basic table](#basic-table)
  - [horizontally long table](#horizontally-long-table)
  - [table with aligned format](#table-with-aligned-format)
- [text decoration](#text-decoration)
- [header1](#header1)
  - [header2](#header2)
    - [header3](#header3)
      - [header4](#header4)
        - [header5](#header5)
- [code block](#code-block)
- [block quote](#block-quote)
- [images](#images)

# unordered list

- １階層目がこんな感じ
  - ２階層目はこういうふうに見える
- 次の項目はこんな感じ

# ordered list

1. １階層目がこんな感じ
   1. ２階層目はこういうふうに見える
2. 次の項目はこんな感じ

# table

## basic table

| header1 | header2 | header3 |
| ------- | ------- | ------- |
| cell1   | cell2   | cell3   |
| cell1   | cell2   | cell3   |
| cell1   | cell2   | cell3   |

## horizontally long table

| header1 | header2 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 | header3 |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| cell1   | cell2   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   |
| cell1   | cell2   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   |
| cell1   | cell2   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   | cell3   |

## table with aligned format

| header1 | header2 | header3 |
| :------ | :-----: | ------: |
| cell1   |  cell2  |   cell3 |
| cell1   |  cell2  |   cell3 |
| cell1   |  cell2  |   cell3 |

# text decoration

~~取り消し線~~

**太字**

_イタリック体_

[リンク文字](#text-decoration)

URL ベタ打ち
https://www.hirotoni.com/mdxposts/2022-08-18/markdown-sample#text-decoration

- [ ] 未チェック
- [x] 済チェック

# header1

サンプルサンプルサンプルサンプルサンプル

## header2

サンプルサンプルサンプルサンプルサンプル

### header3

サンプルサンプルサンプルサンプルサンプル

#### header4

サンプルサンプルサンプルサンプルサンプル

##### header5

サンプルサンプルサンプルサンプルサンプル

# code block

```python
# this is a comment
def aiueo():
  variable = "string"
  num = 60
  null = None
  print([i**2 for i in range(5)])
  pass
```

```javascript {1,3-4} showLineNumbers
// this is a comment
function aiueo() {
  const number = 60;
  const func = ()=>{
    return {{{}}}
  }
  console.log("string");
  console.log(60);
  return null;
}
```

# block quote

引用文

> 引用文　引用文　引用文
> 引用文　引用文　引用文
>
> 引用文　引用文　引用文

# images

![pudding](/images/posts/2022-08-02/pudding.jpg)
