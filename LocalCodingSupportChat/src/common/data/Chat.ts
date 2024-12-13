/**
 * チャット情報を保持するクラス。
 */
export class Chat {
  /**
   * コンストラクタ
   * @param id チャットID
   * @param title タイトル
   * @param lastModifiedDate 最終編集日時
   * @param messages メッセージ一覧
   */
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly lastModifiedDate: Date,
    public readonly messages: ChatMessage[]
  ) {}

  static fromJSON(json: any): Chat {
    return new Chat(
      json.id,
      json.title,
      new Date(json.lastModifiedDate),
      json.messages
        ? json.messages.map((msg: any) => new ChatMessage(msg.role, msg.content))
        : new Array<ChatMessage>()
    )
  }

  toJSON(): any {
    return {
      id: this.id,
      title: this.title,
      lastModifiedDate: this.lastModifiedDate.toISOString(),
      messages: this.messages?.map((msg) => msg.toJSON())
    }
  }
}

/**
 * チャットメッセージ情報を保持するクラス
 */
export class ChatMessage {
  constructor(
    public readonly role: 'system' | 'user' | 'assistant',
    public readonly content: string
  ) {}

  toJSON(): any {
    return {
      role: this.role,
      content: this.content
    }
  }
}
