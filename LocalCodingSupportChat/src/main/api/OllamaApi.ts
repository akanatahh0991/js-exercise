import { Readable, Transform } from 'node:stream'
import { ReadableStream as NodeReadableStream } from 'stream/web'

/**
 * Ollamaのチャットメッセージを表すクラス。
 */
export class OllamaChatMessage {
  constructor(
    public readonly role: 'system' | 'user' | 'assistant',
    public readonly content: string
  ) {}
}
/**
 * OllamaのAPIを提供するクラス
 */
export class OllamaApi {
  constructor(private modelType: string) {}

  /**
   * chatをおこなう。
   * @param messages メッセージ一覧
   * @returns チャットの返答
   */
  async chat(messages: OllamaChatMessage[]): Promise<Readable> {
    const response: Response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        model: this.modelType,
        messages
      })
    })
    if (!response.ok) {
      throw new Error(`OllamaApi chat was failed: ${response.status}`)
    }

    const rawStream = response.body as unknown as NodeReadableStream
    if (!rawStream) {
      throw new Error('OllamaApi chat was failed: empty body')
    }

    const nodeStream = Readable.fromWeb(rawStream)

    const transformStream = new Transform({
      readableObjectMode: true,
      transform(chunk, _, callback): void {
        try {
          const json = JSON.parse(chunk.toString())
          if (json.message?.content) {
            callback(null, json.message.content)
          } else {
            callback()
          }
        } catch (err) {
          callback(new Error(`Failed to process chunk: ${err}`))
        }
      }
    })

    return nodeStream.pipe(transformStream)
  }
}
