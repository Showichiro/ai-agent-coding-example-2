# 機能設計書: TODOアプリ

## 1. 概要

Terminal UI（React Ink）を使用したTODOタスク管理アプリケーション。ユーザーがコマンドライン上でタスクの作成、管理、整理を効率的に行えるツール。

## 2. 背景

CLI環境での作業が多い開発者にとって、GUIアプリケーションとの切り替えはワークフローを阻害する要因となる。Terminal UIで完結するTODO管理ツールにより、シームレスなタスク管理を実現する。

## 3. ゴール

- Terminal環境でのタスク管理体験の向上
- 直感的で効率的なCLIベースのタスク操作の実現
- React Inkを活用したモダンなTerminal UI設計の実践

## 4. スコープ

### 4.1. スコープ内

- 基本的なCRUD操作（作成、読取、更新、削除）
- ステータス管理（todo, in_progress, done）
- フィルタリング機能（ステータス別）
- ソート機能（作成日順、締切日順）
- Terminal UIでの対話的操作

### 4.2. スコープ外

- 複数ユーザー対応
- データの永続化（ファイル保存、データベース連携）
- 通知機能
- タスクの共有機能
- 添付ファイル機能

## 5. ドメイン定義

| 用語 | 説明 |
| --- | --- |
| Task | TODOアプリの基本単位。タイトル、説明、ステータス、締切日を持つ |
| Status | タスクの進行状況を表す値（todo, in_progress, done） |
| Filter | 特定の条件でタスクを絞り込む機能 |
| Sort | タスクを特定の順序で並び替える機能 |

## 6. 機能仕様

### 6.1. コアドメインモデル（src/core/domain/）

```typescript
// Task type definition
type TaskStatus = 'todo' | 'in_progress' | 'done';

type Task = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly status: TaskStatus;
  readonly dueDate?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

// Task operations
type CreateTaskInput = {
  readonly title: string;
  readonly description?: string;
  readonly dueDate?: Date;
};

type UpdateTaskInput = {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly status?: TaskStatus;
  readonly dueDate?: Date;
};
```

### 6.2. 機能一覧

#### タスク管理
- **タスク作成**: タイトル（必須）、説明、締切日を設定してタスクを作成
- **タスク編集**: 既存タスクの各項目を編集
- **タスク削除**: 指定したタスクを削除
- **ステータス変更**: todo → in_progress → done の状態遷移

#### 表示・ソート機能
- **一覧表示**: 全タスクをテーブル形式で表示
- **ステータスフィルタ**: 特定のステータスのタスクのみ表示
- **ソート**: 作成日順／締切日順（昇順・降順）

### 6.3. UI仕様

#### メイン画面レイアウト
```
┌─────────────────────────────────────────────────────────────┐
│                        TODO App                             │
├─────────────────────────────────────────────────────────────┤
│ Filter: [All] [Todo] [In Progress] [Done]                   │
│ Sort: [Created] [Due Date] [▲Asc] [▼Desc]                   │
├─────────────────────────────────────────────────────────────┤
│ ID │ Title        │ Status      │ Due Date   │ Created     │
│ 1  │ Fix bug      │ in_progress │ 2024-01-15 │ 2024-01-10  │
│ 2  │ Add feature  │ todo        │ -          │ 2024-01-12  │
├─────────────────────────────────────────────────────────────┤
│ [N]ew [E]dit [D]elete [S]tatus [Q]uit                       │
└─────────────────────────────────────────────────────────────┘
```

#### キーボード操作
- `N`: 新規タスク作成モード
- `E`: 選択タスクの編集モード
- `D`: 選択タスクの削除確認
- `S`: 選択タスクのステータス変更
- `↑/↓`: タスク選択
- `Tab`: フィルタ/ソート切り替え
- `Q` / `Ctrl+C`: アプリ終了

## 7. 非機能要件

- **パフォーマンス**: 最大100件のタスクに対して即座に応答
- **ユーザビリティ**: 直感的なキー操作、明確な画面表示
- **保守性**: 純粋関数ベースの実装、型安全性の確保
- **テスト性**: ドメインロジックの単体テスト、UI統合テスト

## 8. TODO

- [x] 機能設計書の作成
- [ ] ドメインモデルの実装
- [ ] ビジネスロジックの実装
- [ ] React Ink UIコンポーネントの実装
- [ ] キーボード操作の実装
- [ ] テストの実装
- [ ] 統合テストの実施