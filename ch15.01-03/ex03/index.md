> scriptタグのintegrity属性のようなセキュリティ機能があるとどのような攻撃を防御できるか記述しなさい。

CDNなどから取得したリソースが攻撃者によって改竄されている場合にブラウザが検証することができる。
[参考](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity)

補足
- リソースのハッシュ値はリソース提供側が通常用意する。[例Boostrap](https://getbootstrap.com/)
- integrity属性が空文字の場合に検証は行われない。