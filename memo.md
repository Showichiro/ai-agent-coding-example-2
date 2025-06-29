## 目的
TODOアプリを作る中でAI駆動開発のアーキテクチャを確定させる。

## 前回やってて思ったこと
1. tmuxによる複数エージェントの開発はお遊び感ある。
  - tmuxは別にA2Aのための仕組みではない
    - もう少し作りこむ余地がありそうではあるが、どうせそのうちA2Aのためのフレームワークとかライブラリとか出てくるからこれは待ちでよさそう
    - 疑似的に複数ぽくするのが限度かなぁ
      - レビュワーエージェント、アーキテクチャエージェントみたいなのをroleを用意してclaude code sdkを呼ぶ＋ 呼び出す処理をカスタムコマンド化するというのはどうか？...☆  
2. コード例をこっちで作ってやると結構期待したコードになりそう
  - アーキテクチャについてドキュメントを書くだけでは結構無視される.多分伝わっていない.
3. Next.jsでフルスタックは開発検証にはちょっと富豪過ぎ
  - 他の人の意見見る限り、CLIアプリくらいがフラットでよさそう 
4. 開発日誌を記録させるのはよさそう
  - アドオンで指示したことをどんどん出力させておいて、開発フローに取り込んでおく

## workflow

0. プロジェクトセットアップ
人間がやる.
  - アプリケーションのひな型とかを作る
    - ディレクトリ構成とか
  - コード例を用意する
    - Reactなら
      - Componentの使い方
        - とくにライブラリを利用する場合は腐敗防止層経由で使えとかコード例を残すべき
      - Promiseの使い方
        - `use` hookを使うとか
  - プロンプトなどを用意する
    - TDD
    - 宣言的にやる
    - 

###  1. 要件定義
人間がやる.
- `docs/requirements`に記載

### 2. 機能設計
AIがやる.

1. 設計書作成
- `docs/requirements` -> `docs/features/<requirement-key>/*.md`にする.

2. 機能設計レビュー
AIがやる.カスタムコマンド化する.レビューチェックリストを先に作っておいてそれを読み、レビューを記録する.
`docs/feature/<requirement-key>/*.md` -> `docs/reviews/<feature-key>-review-result-<index>.md`

3. レビュー指摘の修正
`docs/reviews/<feature-key>-review-result-<index>.md` -> `docs/feature/<requirement-key>/*.md`

4. 再レビュー
`docs/feature/<requirement-key>/*.md` -> `docs/reviews/<feature-key>-review-result-<index>.md`

FIXするまで繰り返す

TODO: 設計書のひな型を作成する。
ドメインの定義。

### 3. 実装

#### 1. 実装

設計書からTODOリストの中間ドキュメントを作るべき？
- 多分機能のサイズ次第。先に実装サイズを想定させて10ファイルを超える場合は、TODOリスト化させる.
`docs/implements/**.md`にTODOリストを作成させる..☆要ひな型

1. テストを書く
2. パスさせる
3. リファクタリング

を繰り返す.

#### 実装レビュー

AIがやる.
reviewチェックリストを作成.

1. レビュー

`実装コード` -> `docs/reviews/<feature-key>-implement-review-result-<index>.md`

2. レビュー指摘の修正

3. 再レビュー

### 4. 統合テスト

AIがやる.

テストケースを作成する.

`docs/features/<requirement-key>/*.md` -> `docs/tests/<requirement-key>/*.md`

playwright mcpで通しで操作させる.

### 5. 受入テスト

人間がやる.