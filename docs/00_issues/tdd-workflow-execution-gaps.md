# TDDワークフロー実行不足: RefactorとCommitの自発的実行

## 問題の概要

TODOアプリ実装において、TDD and Tidy First Development Workflowの6ステップを完全に遵守せず、特にStep 4（Commit）とStep 5（Refactor）を自発的に実行しなかった。

## 発生した問題

### 1. コミットタイミングの遅延
- **期待される動作**: 各Green段階後に即座にコミット（Step 4）
- **実際の動作**: ユーザーからの「コミット」指示を待機
- **影響**: 大きな単位でのコミットになり、変更の追跡可能性が低下

### 2. Refactorステップの省略
- **期待される動作**: Green後に構造改善機会を積極的に探す（Step 5）
- **実際の動作**: 「動くコード」で満足し、構造改善を検討せず
- **影響**: コード品質向上の機会を逸失

### 3. 大きなサイクルでの作業
- **期待される動作**: 小さな機能単位でRed-Green-Refactor-Commitサイクル
- **実際の動作**: 複数機能をまとめて実装してから一括処理
- **影響**: TDDの利点（早期フィードバック、安全なリファクタリング）を享受できず

## 具体的な違反例

### Task Domain実装時
```
実際のフロー:
Red (createTask test) → Green (createTask impl) → Red (updateTask test) → Green (updateTask impl) → ... → 大きなコミット

あるべきフロー:
Red (createTask test) → Green (createTask impl) → Refactor → Commit → Red (updateTask test) → Green (updateTask impl) → Refactor → Commit
```

### UIコンポーネント実装時
```
実際のフロー:
4つのコンポーネントを一気に実装 → 後追いテスト → 大きなコミット

あるべきフロー:
各コンポーネント毎にRed-Green-Refactor-Commitサイクル
```

## 根本原因分析

### 1. プロセス理解の不足
- TDDを「テスト手法」として捉え、「開発プロセス全体」として理解していなかった
- Step 4, 5の重要性を軽視

### 2. 大きなタスク思考
- 「TODOアプリ全体の実装」という大きな単位で作業を捉えた
- 小さなサイクルへの分解が不十分

### 3. 外部指示待ち
- 自律的なプロセス実行ではなく、ユーザー指示に依存
- TDDの自律性を理解していなかった

### 4. Refactor意識の欠如
- 「動作する」ことで満足
- 「構造改善」への意識が低い

## 対応策

### 即座の対応
- [x] 問題の認識と記録（本ドキュメント）
- [ ] 今後の実装では厳格なプロセス遵守

### 再発防止策

#### 1. プロセス自動化
```typescript
// 疑似コード: 理想的な自律的TDDフロー
function implementFeature(feature: string) {
  while (!feature.isComplete()) {
    writeFailingTest();      // Step 2: Red
    makeTestPass();          // Step 3: Green
    commitBehavioralChange(); // Step 4: Commit (自動実行)
    refactorCode();          // Step 5: Refactor (自動検討)
    if (hasStructuralChanges()) {
      commitStructuralChange(); // 構造変更コミット
    }
  }
}
```

#### 2. チェックリストの導入
各Green後の必須チェック:
- [ ] テストが通ったか？
- [ ] 即座にコミットしたか？
- [ ] リファクタリング機会はないか？
- [ ] 重複コードはないか？
- [ ] 名前は適切か？
- [ ] 構造は改善できるか？

#### 3. 小さなサイクルの強制
- 1つの関数 = 1つのRed-Green-Refactor-Commitサイクル
- 30分以上のサイクルは分割を検討

#### 4. 自律的判断の強化
- ユーザー指示を待たずにプロセスを実行
- 「動く」ではなく「良い構造で動く」を目指す

## 学んだ教訓

1. **TDDはプロセス**: 単なるテスト手法ではなく、開発プロセス全体を規定する
2. **小さなサイクルの価値**: 早期フィードバックと安全な改善のために必須
3. **自律性の重要性**: 外部指示待ちではなく、プロセスに従った自律的実行
4. **Refactorは義務**: 「動く」で満足せず、「良い構造」を追求する責任

## 測定指標

今後のプロジェクトでの改善測定:
- コミット頻度（理想: 各Green後）
- リファクタリングコミットの比率
- サイクル時間（理想: 10-30分）
- プロセス遵守率

## 関連ドキュメント
- `instructions/README.md` - TDD and Tidy First Development Workflow
- `docs/00_issues/tdd-violation-ui-components.md` - 関連するTDD違反

## 日時
2025-06-30 00:02 JST