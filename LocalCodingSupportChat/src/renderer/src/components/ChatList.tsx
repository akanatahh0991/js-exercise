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

  return (
    <div className="w-1/4 bg-gray-100 dark:bg-gray-800">
      <button
        onClick={handleNewChat}
        className="w-full bg-blue-500 text-white py-2 dark:bg-blue-700"
      >
        New Chat
      </button>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
