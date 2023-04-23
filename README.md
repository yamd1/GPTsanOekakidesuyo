# GPTsanOekakidesuyo

## 概要
OpenAI APIをターゲットに、リクエストを送信するためのProxyサーバーとして機能するサービスである。  
本プロジェクトを用いることで、得られるベネフィット  
- ユーザーインターフェイスが自由に選択可能。（例えば、本プロジェクトフロントエンドのお絵かき画面、Slack、Line）
- ユーザーのやり取りを保持・分析が可能。
- 機密情報などの送信を防ぐためのマスク処理機能を持たせることが可能。

---
## 使い方

### Frontend
- `npm i -g http-server` を実行してhttp-serverをインストール。
- `/frontend` ディレクトリ内で `http-server` を実行。

### Backend
- `Docker Desktop` をインストール。
- `/backend` ディレクトリ内で `docker compose up -d` を実行。
- (初回のみ)`/backend/server/.env.example`から.envをコピー。
- (初回のみ)`/backend/server/.env`内部に適切なクレデンシャル情報を入力する。
- (初回のみ)`docker exec server sh` でコンテナ内に入る。
- (初回のみ)データベースセットアップのため、`npx prisma migrate` `npx prisma generate dev` `npm run seed` を実行。
- OpenAI Chat のシステム設定を変更したい場合は、`/backend/server/.env` ファイルの `OPENAI_CHAT_SYSTEM_MESSAGE` を変更する。

---
## Database Design

### ER図

![データベース ER図](./docs/database/ER.png)


---
## Backend Design

### API概要

| API名 | 概要 | 
|-------|------|------------------|
| Themes | 出題されるお題に関するAPI |
| Sessions | 過去のゲーム一覧に関するAPI |
| Session | 一回のゲームに関するAPI |

### エンドポイント一覧

#### Sessions

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/sessions` | `GET` | `-` | { <br> "sessions": { <br> "id": number, <br> "name": string, <br> "created_at": Date, <br> "updated_at": Date \| null  <br> } [] <br> } |

#### Session

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/session/:id` | `GET` | `PathParam=id` | { <br> "session": { <br> "id": number, <br> "name": string, <br> "messages": { <br> "id": number, <br> "message": string, <br> }[], <br> "created_at": Date, <br> "updated_at": Date \| null  <br> } <br> } |
| `/session` | `POST` | { <br> "id": number \| undefined, <br> "message": string <br>} | { <br> "session": {<br> "id": number, <br> "name": string, <br> "response": string, <br>  } <br> } |


#### Themes

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/themes` | `GET` | `-` | {<br> "getThemes" : [ <br> "id": number,<br> "theme": string, <br> "created_at": Date, <br> "updated_at": Date, <br>  ]<br>} |

---
#### GetSessions 

![GetSessions シーケンス図](./docs/backend/Common_GetRecord.svg.svg)

---
#### GetSession

![GetSession シーケンス図](./docs/backend/Common_GetRecord.svg.svg)

---
#### PostSession

![PostSession シーケンス図](./docs/backend/PostSession.svg)

---
#### GetTheme

![GetTheme シーケンス図](./docs/backend/Common_GetRecord.svg.svg)
