import React, { useState } from 'react'
import { ChatList } from '../components/ChatList'
import { ChatWindow } from '../components/ChatWindow'

export const HomePage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  return (
    <div className="flex h-screen text-black dark:text-white bg-gray-50 dark:bg-gray-900">
      <ChatList onSelect={setSelectedChatId} />
      {selectedChatId && <ChatWindow chatId={selectedChatId} />}
    </div>
  )
}
