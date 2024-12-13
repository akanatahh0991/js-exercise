import React, { useState, useEffect, useRef } from 'react'
import { ChatInput } from './ChatInput'
import { ChatMessage } from '../../../common/data/Chat'

export const ChatWindow: React.FC<{ chatId: string }> = ({ chatId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const chatRef = useRef<HTMLDivElement>(null)

  const updateMessages = async (): Promise<void> => {
    const chat = await window.chatApi.getChatById(chatId)
    if (chat) {
      setMessages(chat.messages)
    }
  }

  useEffect(() => {
    updateMessages()
  }, [chatId])

  const handleNewMessage = async (message: string): Promise<void> => {
    setMessages((prev) => [...prev, new ChatMessage('user', message)])

    await window.chatApi.queryChat(chatId, message, (response) => {
      if (response.err) {
        console.error(`Error: ${response.chunk}`)
        return
      }

      if (!response.end) {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage && lastMessage.role === 'assistant') {
            // 最後のassistantメッセージにチャンクを連結
            return [
              ...prev.slice(0, -1),
              new ChatMessage('assistant', lastMessage.content + response.chunk)
            ]
          }
          // 新しいassistantメッセージを追加
          return [...prev, new ChatMessage('assistant', response.chunk || '')]
        })
      }

      if (response.end) {
        console.log(`Chat ${response.id} completed`)
      }

      chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
    })
  }

  return (
    <div className="w-3/4 flex flex-col bg-white dark:bg-gray-900">
      <div ref={chatRef} className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 ${msg.role === 'user' ? 'text-right' : 'text-left'} dark:text-white`}
          >
            {msg.role === 'assistant' && <span>🤖</span>}
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <ChatInput onSubmit={handleNewMessage} />
    </div>
  )
}
