# Issue: Pre-commit Quality Checks

## 概要

現在のワークフローでは、コード品質チェック（lint/format/typecheck）がコミット後に実行されることがあり、品質問題を含むコミットが履歴に残る可能性がある。

## 問題

### 現在の状況
- コミット後にlint/format/typecheckを実行
- 品質問題が発見された場合、追加の修正コミットが必要
- Git履歴に品質問題を含むコミットが残る
- CI/CDパイプラインでの失敗リスク

### 具体例
```bash
# 現在のワークフロー（問題のあるパターン）
git add .
git commit -m "feat: implement feature"  # 品質チェック前にコミット
pnpm lint    # エラー発見
pnpm format  # 修正
pnpm build   # typecheck
git add .
git commit -m "style: fix lint errors"   # 追加の修正コミット
```

## 推奨解決策

### 1. Pre-commit Hook の導入

**Huskyを使用したpre-commit hook**

```bash
# 導入手順
pnpm add --save-dev husky
npx husky init
echo "pnpm run pre-commit" > .husky/pre-commit
```

**package.jsonにスクリプト追加**
```json
{
  "scripts": {
    "pre-commit": "pnpm lint && pnpm format && pnpm build && pnpm test"
  }
}
```

### 2. 段階的品質チェック

**推奨コミット前ワークフロー**
```bash
# 1. コード品質チェック
pnpm lint     # Biome linter
pnpm format   # Biome formatter  
pnpm build    # TypeScript type check
pnpm test     # テスト実行

# 2. すべて成功後にコミット
git add .
git commit -m "feat: implement feature with quality checks"
```

### 3. CLAUDE.mdの更新

現在のCLAUDE.mdに以下を追加：

```markdown
## Code Quality Workflow

### コミット前必須チェック
1. `pnpm lint` - コードリンティング
2. `pnpm format` - コード整形
3. `pnpm build` - TypeScript型チェック
4. `pnpm test` - テスト実行

すべてのチェックが通過した後にのみコミットを実行してください。
```

## 実装優先度

**High Priority:**
- [ ] package.jsonにpre-commitスクリプト追加
- [ ] CLAUDE.mdの品質チェック手順更新
- [ ] AI agentのワークフロー指示更新

**Medium Priority:**
- [ ] Huskyによるpre-commit hook導入
- [ ] lint-stagedによる部分的チェック最適化

## 期待効果

### 品質向上
- コミット前の必須品質チェック
- 一貫したコードスタイル
- 型安全性の保証

### 開発効率
- CI/CDでの失敗減少
- クリーンなGit履歴
- レビュー時間短縮

### チーム協力
- 統一された開発プロセス
- 品質基準の明確化
- 自動化による人的ミス削減

## 関連ファイル

- `package.json` - スクリプト設定
- `CLAUDE.md` - 開発ガイドライン
- `.husky/pre-commit` - Git hook設定（将来）

## ステータス

- **作成日**: 2025-06-30
- **優先度**: High
- **担当**: AI Agent
- **関連機能**: TODOアプリUI改善プロジェクト