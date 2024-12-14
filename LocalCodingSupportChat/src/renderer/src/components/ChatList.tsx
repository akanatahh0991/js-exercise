import React, { useState, useEffect } from 'react'
import { Chat } from '../../../common/data/Chat'
import AddNote8Icon from '../assets/add_note_8.png'

export const ChatList: React.FC<{
  onSelect: (id: string) => void,
  selectedChatId: string | null
}> = ({ onSelect, selectedChatId }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>('')

  function getDescTimeSortedChats(chats: Chat[]): Chat[] {
    return chats.sort((c1, c2) => (c1.lastModifiedDate < c2.lastModifiedDate ? 1 : -1))
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

  const handleTitleChange = async (): Promise<void> => {
    if (editingChatId) {
      const updatingChat = chats.find((chat) => chat.id === editingChatId)
      if (updatingChat?.title !== editingTitle) {
        await window.chatApi.editChatTitleOf(editingChatId, editingTitle)
        const updatedChats = await window.chatApi.getChats()
        setChats(getDescTimeSortedChats(updatedChats))
      }
      setEditingChatId(null)
      setEditingTitle('')
    }
  }

  const handleEditStart = (chatId: string, currentTitle: string): void => {
    setEditingChatId(chatId)
    setEditingTitle(currentTitle)
  }
  return (
    <div className="w-1/4 h-full bg-gray-200 dark:bg-gray-800 border-r border-gray-400 dark:border-gray-700 p-2">
      {/* 新規チャットボタン */}
      <button
        onClick={handleNewChat}
        className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mb-4"
      >
        <img src={AddNote8Icon} alt="Add Chat" className="w-6 h-6" />
      </button>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`p-2 rounded cursor-pointer ${
              chat.id === editingChatId
                ? 'bg-gray-300 dark:bg-gray-700'
                : chat.id === selectedChatId
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : ''
            }`}
          >
            {editingChatId === chat.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={handleTitleChange} // フォーカスを外したとき確定
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleChange() // Enterキーで確定
                }}
                className="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded"
                autoFocus
              />
            ) : (
              <div
                onDoubleClick={() => handleEditStart(chat.id, chat.title)} // ダブルクリックで編集モードに
              >
                <div className="text-sm font-bold">{chat.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(chat.lastModifiedDate).toLocaleString()}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
