import React, { useState } from 'react'
import { ChatList } from '../components/ChatList'
import { ChatWindow } from '../components/ChatWindow'

export const HomePage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <ChatList onSelect={setSelectedChatId} selectedChatId={selectedChatId} />
      {selectedChatId && <ChatWindow chatId={selectedChatId} />}
    </div>
  )
}
