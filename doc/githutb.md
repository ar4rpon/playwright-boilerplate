##リポジトリはGitHub flowで管理する

##開発フローざっくり
NewIssue → issue番号に対応したブランチを作成 → mainにプルリクエスト → merge → 作業ブランチ削除

##詳細

### GitHubでの効率的なブランチ管理とコミットのプロセス

1. **新規ブランチの作成**

   - `git branch 新規ブランチ名_#issue番号` で新しいブランチを作成。
   - `git checkout 新規ブランチ名` で作成したブランチに移動。
   - `git checkout -b 新規ブランチ名_#issue番号` でブランチの作成と移動を同時に行う。

2. **コミットの実行**

   - `git commit -m "コミットメッセージ #issue番号"` でコミット。Issue番号を含めることで、コミットとIssueを関連付ける。

3. **ブランチへのプッシュ**

   - `git push origin 作業ブランチ名` または `git push origin HEAD` でローカルの変更をリモートの作業ブランチにプッシュ。

4. **プルリクエストの作成**

   - GitHub上で「Compare & pull request」ボタンを押し、プルリクエストを作成。
   - コメント欄に `close #issue番号` を記載して、マージ時にIssueを自動的に閉じる。

5. **プルリクエストのレビューとマージ**

   - 「File changed」で変更差分を確認し、コメントがあれば修正。
   - 必要に応じて、作業ブランチで修正を行い、`git add`、`git commit`、`git push origin 作業ブランチ名` で更新。
   - 「Merge pull request」ボタンを押してマージ。その後、「Delete branch」でリモートの作業ブランチを削除。

6. **mainブランチの更新**

   - `git checkout main` でmainブランチに移動し、`git pull origin main` で更新。
   - ローカルでmerge commitが作成されるため、`git push` を行う。`git pull --rebase` でmerge commitを回避できる。

7. **ローカルの作業ブランチの削除**
   - `git branch -d 作業ブランチ名` でローカルの作業ブランチを削除。

###参考にしたサイト
https://zenn.dev/ogakuzuko/articles/2250f7c7331106

##commitメッセージのフォーマット
<Type>: <Emoji> #<Issue Number> <Title>

- フォーマット: <Type>: <Emoji> #<Issue Number> <Title>
- 例: feat: ✨ #123 ログイン機能の実装をする
- TypeとTitleは必須
- Issue Numberは強く推奨
- Emojiは任意
- Description（スリーライン）は任意
- コミットメッセージは現在形で（「◯◯した」ではなく「◯◯する」）書くこととします

Emoji
https://gitmoji.dev/

###Type

- chore
  - タスクファイルなどプロダクションに影響のない修正
- docs
  - ドキュメントの更新
- feat
  - ユーザー向けの機能の追加や変更
- fix
  - ユーザー向けの不具合の修正
- refactor
  - リファクタリングを目的とした修正
- style
  - フォーマットなどのスタイルに関する修正
- test
  - テストコードの追加や修正

以下のサイトを参考にしている
https://zenn.dev/itosho/articles/git-commit-message-2023

##よく使うコマンド（忘れそうなコマンドを適宜追加）

- プルリクをマージした後のリモートブランチ削除をローカルに適用させる
  - git fetch --prune
