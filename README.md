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
| `/themes` | `GET` | `` | `{<br> "getThemes" : [ <br> "id": number,<br> "theme": string, <br> "created_at": Date, <br> "updated_at": Date, <br>]<br>}` |

### Sessions

| エンドポイント | リクエストタイプ | パラメーター | レスポンス |
|--------------|--------------|-----------|---------|
| `/sessions` | `GET` | `` | `{<br> "": "value1",<br> "key2": "value2"<br>}` |
| `/sessions` | `POST` | `{<br> "session": { <br> "id": number \| undefined, <br> "message": string <br>}<br>}` | `{<br> "key1": "value1",<br> "key2": "value2"<br>}` |

---
### GetTheme

![GetTheme シーケンス図](./docs/GetTheme.svg)
