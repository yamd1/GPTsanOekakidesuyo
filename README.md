# GPTsanOekakidesuyo

## 概要
OpenAI APIをターゲットに、リクエストを送信するためのProxyサーバーとして機能するサービスである。
本プロジェクトを用いることで、得られるベネフィット
- ユーザーインターフェイスが自由に選択可能。（例えば、本プロジェクトフロントエンドのお絵かき画面、Slack、Line）
- ユーザーのやり取りを保持・分析が可能。
- 機密情報などの送信を防ぐためのマスク処理機能を持たせることが可能。


---
## Database Design


---
## Backend Design

## API概要

| API名 | 概要 | ドキュメントリンク |
|-------|------|------------------|
| Themes | 出題されるお題に関するAPI | [API1ドキュメント](リンク) |
| Sessions | 過去のゲーム一覧に関するAPI | [API2ドキュメント](リンク) |
| Session | 一回のゲームに関するAPI | [API2ドキュメント](リンク) |

## エンドポイント一覧

### Sessions

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/sessions` | `GET` | `-` | { <br> "sessions": { <br> "id": number, <br> "name": string, <br> "created_at": Date, <br> "updated_at": Date \| null  <br> } [] <br> } |

### Session

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/session/:id` | `GET` | `PathParam=id` | { <br> "session": { <br> "id": number, <br> "name": string, <br> "messages": { <br> "id": number, <br> "message": string, <br> }[], <br> "created_at": Date, <br> "updated_at": Date \| null  <br> } <br> } |
| `/session` | `POST` | { <br> "id": number \| undefined, <br> "message": string <br>} | { <br> "session": {<br> "id": number, <br> "name": string, <br> "response": string, <br>  } <br> } |


### Themes

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/themes` | `GET` | `-` | {<br> "getThemes" : [ <br> "id": number,<br> "theme": string, <br> "created_at": Date, <br> "updated_at": Date, <br>  ]<br>} |

---
### GetSessions 

### GetSession

### PostSession

![PostSEssion シーケンス図](./docs/PostSession.svg)

### GetTheme

![GetTheme シーケンス図](./docs/GetTheme.svg)
