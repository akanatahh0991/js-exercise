## 疑問点
- `/* eslint-disable */`を使用してもeslintの除外とならなかった。理由を教えてほしい。

## ESlint

`TARGET=ex01 npm run lint`と打つと、ex01に対してlintがかかる。ただし、eslintrc.cjsにignore対象としているファイルは対象外となる。