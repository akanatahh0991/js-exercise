declare global {
  interface Window {
    chatApi: ChatApi
  }
}

export interface ChatApi {
  getChats(): Promise<Chat[]>
  getChatById(id: string): Promise<Chat | null>
  createNewChat(title: string): Promise<Chat | null>
  editChatTitleOf(id: string, title: string): Promise<Chat | null>
  queryChat(
    id: string,
    message: string,
    onResponse: (response: { err: boolean; end: boolean; id: string; chunk: string | null }) => void
  ): Promise<void>
}
