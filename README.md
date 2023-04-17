# GPTsanOekakidesuyo


---
## Backend Design

## API概要

| API名 | 概要 | ドキュメントリンク |
|-------|------|------------------|
| Themes | 出題されるお題に関するAPI | [API1ドキュメント](リンク) |
| Sessions | 1回毎のゲームに関するAPI | [API2ドキュメント](リンク) |

## エンドポイント一覧

### Themes

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/themes` | `GET` | `` | {<br> "getThemes" : [ <br> "id": number,<br> "theme": string, <br> "created_at": Date, <br> "updated_at": Date, <br>  ]<br>} |

### Sessions

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/sessions` | `GET` | `` | { <br> "sessions": { <br> "id": number, <br> "name": string, <br> "created_at": Date, <br> "updated_at": Date \| null  <br> } [] <br> } |
| `/sessions` | `POST` | `{   "session": {  "id": number \| undefined,   "message": string  }  }` | `{  "key1": "value1",  "key2": "value2"  }` |

### Session

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/session/:id` | `GET` | `PathParam=id` | { <br> "session": { <br> "id": number, <br> "name": string, <br> "messages": { <br> "id": number, <br> "message": string, <br> "created_at": Date, <br> "updated_at": Date \| null, <br> }, <br> "created_at": Date, <br> "updated_at": Date \| null  <br> } <br> } |

---
### GetTheme

![GetTheme シーケンス図](./docs/GetTheme.svg)
