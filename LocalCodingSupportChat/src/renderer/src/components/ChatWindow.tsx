import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ChatInput } from './ChatInput'
import { ChatMessage } from '../../../common/data/Chat'

export const ChatWindow: React.FC<{ chatId: string }> = ({ chatId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const chatRef = useRef<HTMLDivElement>(null)
  const chatIdRef = useRef(chatId)

  // メッセージ更新
  const updateMessages = async (): Promise<void> => {
    const chat = await window.chatApi.getChatById(chatId)
    if (chat) {
      setMessages(chat.messages)
    }
  }

  useEffect(() => {
    chatIdRef.current = chatId
    updateMessages()
  }, [chatId])

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }, [messages])

  // 新しいメッセージ処理
  const handleQueryChat = async (message: string): Promise<void> => {
    const queryingChatId = chatId
    let latestMessages = [...messages, new ChatMessage('user', message)]

    if (queryingChatId === chatIdRef.current) {
      setMessages(latestMessages)
    }

    await window.chatApi.queryChat(chatId, message, (response) => {
      if (response.err) {
        console.error(`Error: ${response.chunk}`)
        return
      }

      const lastMessage = latestMessages[latestMessages.length - 1]
      if (lastMessage.role === 'user') {
        latestMessages = [...latestMessages, new ChatMessage('assistant', response.chunk || '')]
      } else if (lastMessage.role === 'assistant' && response.chunk) {
        latestMessages = [
          ...latestMessages.slice(0, -1),
          new ChatMessage('assistant', lastMessage.content + response.chunk)
        ]
      } else {
        // 何もしない。
      }
      if (queryingChatId === chatIdRef.current) {
        setMessages(latestMessages)
      }
    })
  }

  return (
    <div className="w-3/4 flex flex-col bg-white dark:bg-gray-900">
      <div ref={chatRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* assistantアイコン */}
            {msg.role === 'assistant' && (
              <div className="mr-2 flex items-start">
                <span className="text-2xl">🤖</span>
              </div>
            )}

            {/* メッセージ内容 */}
            <div
              className={`max-w-3/4 whitespace-pre-wrap p-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    // eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={oneDark}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <ChatInput onSubmit={handleQueryChat} />
    </div>
  )
}
