> npm install すると作成される package-lock.json はどのような役割を持つのか。

package-lock.jsonはpackage.jsonに記載された依存関係に合わせて`npm install`された詳細情報を格納することが役割。詳細情報には依存パッケージの依存しているパッケージのバージョン情報もあり、厳密にバージョンが記載されている。
`npm install`するとまずは、package-lock.jsonの情報を元にインストールが行われる。package-lock.jsonに無い依存関係についてはpackage.jsonを参照する。

> また、リポジトリにコミットすべきか、について説明しなさい。
package-lock.jsonはリポジトリにコミットするべき。package-jsonでは依存パッケージのバージョンやその依存パッケージのバージョンが厳密に定まっていない。（最新のものやXX以下のバージョンなどの指定ができる。）そのため、開発環境ごとに同一のバージョンの依存パッケージをインストールする、CIをおこなうなどを実現するにはpackage-lock.jsonをリポジトリ管理する必要がある。