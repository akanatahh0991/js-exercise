import Datastore from 'nedb'
import path from 'path'
import { app } from 'electron'
import { Chat } from '../../common/data/Chat'
import fs from 'fs'

// ユーザーデータディレクトリにデータベースを保存
const userDataPath = app.getPath('userData') // OSごとのユーザーデータディレクトリを取得
const dbDirectory = path.join(userDataPath, 'data')

// データベース保存ディレクトリが存在しない場合は作成
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true })
}

// データベースファイルのパスを指定
const dbPath = path.join(dbDirectory, 'chats.db')

console.log('Database Path:', dbPath)
const db = new Datastore<Chat>({
  filename: dbPath,
  autoload: true
})

console.log('Database Path:', dbPath)

db.ensureIndex({ fieldName: 'id', unique: true }, (err) => {
  if (err) {
    console.error('Failed to ensure index:', err)
  }
})

export default db
