import Datastore from 'nedb'
import path from 'path'
import { Chat } from '../../common/data/Chat'

const db = new Datastore<Chat>({
  filename: path.join(__dirname, 'chats.db'),
  autoload: true
})

db.ensureIndex({ fieldName: 'id', unique: true }, (err) => {
  if (err) {
    console.error('Failed to ensure index:', err)
  }
})

export default db
