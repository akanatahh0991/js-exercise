import React, { useState, useEffect } from 'react'
import { Chat } from '../../../common/data/Chat'

export const ChatList: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
  const [chats, setChats] = useState<Chat[]>([])

  /**
   * `Chat`の一覧を日付の新しい順(降順) で Sortする
   */
  function getDescTimeSortedChats(chats: Chat[]): Chat[] {
    return chats.sort((c1: Chat, c2: Chat) => (c1.lastModifiedDate < c2.lastModifiedDate ? 1 : -1))
  }

  useEffect(() => {
    const update = async (): Promise<void> => {
      const chats = await window.chatApi.getChats()
      setChats(getDescTimeSortedChats(chats))
    }
    update()
  }, [])

  const handleNewChat = async (): Promise<void> => {
    const chat = await window.chatApi.createNewChat('New Chat')
    setChats(getDescTimeSortedChats([chat, ...chats]))
    onSelect(chat.id)
  }

  const handleEditingChatTitle = async (id: string, title: string): Promise<void> => {
    await window.chatApi.editChatTitleOf(id, title)
    const chats = await window.chatApi.getChats()
    setChats(getDescTimeSortedChats(chats))
  }

  return (
    <div className="w-1/4 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col">
      <div className="flex items-center p-2 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={handleNewChat}
          className="ml-auto w-8 h-8 bg-green-500 rounded-full text-white flex justify-center items-center"
        >
          +
        </button>
      </div>
      <ul className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex flex-col">
            <input
              className="bg-transparent focus:outline-none"
              defaultValue={chat.title}
              onBlur={async (e) => handleEditingChatTitle(chat.id, e.target.value)}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 self-end">
              {new Date(chat.lastModifiedDate).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
