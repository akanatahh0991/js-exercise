import { contextBridge, ipcRenderer } from 'electron'
import { Chat } from '../common/data/Chat'

contextBridge.exposeInMainWorld('chatApi', {
  async getChats(): Promise<Chat[]> {
    return ipcRenderer.invoke('chatApi:getChats')
  },
  async getChatById(id: string): Promise<Chat | null> {
    return ipcRenderer.invoke('chatApi:getChatById', id)
  },
  async createNewChat(title: string): Promise<Chat | null> {
    return ipcRenderer.invoke('chatApi:createNewChat', title)
  },
  async editChatTitleOf(id: string, title: string): Promise<Chat | null> {
    return ipcRenderer.invoke('chatApi:editChatTitleOf', id, title)
  },
  async queryChat(
    id: string,
    message: string,
    onResponse: (response: { err: boolean; end: boolean; id: string; chunk: string | null }) => void
  ): Promise<void> {
    const listener = (
      _: Electron.IpcRendererEvent,
      response: { err: boolean; end: boolean; id: string; chunk: string | null }
    ): void => {
      if (response.id === id) {
        onResponse(response)
        if (response.err || response.end) {
          ipcRenderer.removeListener('chatApi:queryChat:response', listener)
        }
      }
    }
    ipcRenderer.addListener('chatApi:queryChat:response', listener)
    return ipcRenderer.invoke('chatApi:queryChat', id, message)
  }
})
