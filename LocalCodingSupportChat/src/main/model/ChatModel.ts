import { OllamaApi, OllamaChatMessage } from '../api/OllamaApi'
import { Chat, ChatMessage } from '../../common/data/Chat'
import db from '../db/db'

/**
 * チャット機能を提供するモデル
 */
export class ChatModel {
  private api = new OllamaApi('codellama')

  /**
   * 新しいチャットを生成する。
   * @param title タイトル
   * @returns 新しいチャット
   */
  async createNewChat(title: string): Promise<Chat> {
    return new Promise((resolve, reject) => {
      db.insert(
        new Chat(crypto.randomUUID().toString(), title, new Date(), new Array<ChatMessage>()),
        (err, doc) => {
          if (err) {
            reject(err)
          }
          return resolve(Chat.fromJSON(doc))
        }
      )
    })
  }

  /**
   * タイトルを変更し、その結果を返す。
   * チャットidに該当するチャットが存在しない場合はnullを返す。
   * @param id チャットID
   * @param title タイトル
   * @returns タイトル変更後のチャット
   */
  async editChatTitleOf(id: string, title: string): Promise<Chat | null> {
    const chat = await this.getChatById(id)
    if (!chat) {
      return null
    }
    return new Promise((resolve, reject) => {
      const updatedChat = new Chat(id, title, new Date(), chat.messages)
      db.update({ id: chat.id }, updatedChat, {}, (err) => {
        if (err) {
          console.error(`Failed to update chat ${chat.id}:`, err)
          reject(err)
        } else {
          resolve(updatedChat)
        }
      })
    })
  }

  /**
   * チャットidに該当するチャットを取得する。
   * チャットidに該当するチャットがない場合はnullを返す。
   * @param id チャットid
   * @returns チャットidに該当するチャットを返すPromise
   */
  async getChatById(id: string): Promise<Chat | null> {
    return new Promise((resolve, reject) => {
      db.findOne({ id }, (err, doc) => {
        console.log(err, doc)
        if (err) return reject(err)
        if (!doc) {
          return resolve(null)
        }
        return resolve(Chat.fromJSON(doc))
      })
    })
  }

  /**
   * チャット一覧を取得する。
   * @returns チャット一覧
   */
  async getChats(): Promise<Chat[]> {
    return new Promise((resolve, reject) => {
      db.find({}, (err, docs) => {
        if (err) {
          reject(err)
        }
        if (!docs) {
          resolve(new Array<Chat>())
        }
        const chats = docs.map((doc) => Chat.fromJSON(doc))
        resolve(chats)
      })
    })
  }

  /**
   * チャットを問い合わせをおこなう。
   * @param chatId チャットID
   * @param message 入力メッセージ
   * @returns チャットの返答
   */
  async queryChat(chatId: string, message: string): Promise<AsyncIterable<string>> {
    const chat = await this.getChatById(chatId)
    if (chat === null) {
      throw new Error(`invalid chatId: ${chatId}`)
    }
    const messages = chat.messages
      ? [...chat.messages, new ChatMessage('user', message)]
      : [new ChatMessage('user', message)]
    const stream = await this.api.chat(
      messages.map((msg) => new OllamaChatMessage(msg.role, msg.content))
    )
    let repliedMessage = ''

    async function* transformStream(): AsyncIterable<string> {
      for await (const chunk of stream) {
        const message = chunk.toString() // ストリームチャンクを文字列に変換
        repliedMessage += message // 結果を連結
        yield message // 呼び出し元に逐次返す
      }
      if (chat !== null) {
        // 最終的な結果をDBに保存
        const updatedMessages = [
          ...(chat.messages || []),
          new ChatMessage('user', message), // ユーザーの入力
          new ChatMessage('assistant', repliedMessage) // アシスタントの返答
        ]
        const updatedChat = new Chat(chat.id, chat.title, new Date(), updatedMessages)

        db.update({ id: chat.id }, updatedChat, {}, (err) => {
          if (err) {
            console.error(`Failed to update chat ${chat.id}:`, err)
          }
        })
      }
    }
    return transformStream()
  }
}
