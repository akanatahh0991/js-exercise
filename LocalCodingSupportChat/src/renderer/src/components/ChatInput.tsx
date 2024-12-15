import React, { useState, useRef } from 'react'

export const ChatInput: React.FC<{ onSubmit: (message: string) => Promise<void> }> = ({
  onSubmit
}) => {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const lastEnterTime = useRef<number | null>(null) // 最後にEnterキーを押した時刻

  const handleSend = async (): Promise<void> => {
    if (!message.trim() || isSubmitting) return
    setIsSubmitting(true)
    try {
      setMessage('') // メッセージをリセット
      await onSubmit(message)
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto' // テキストエリアの高さをリセット
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const adjustTextareaHeight = (): void => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto' // 高さをリセットしてから
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // 内容に応じて高さを調整
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      const currentTime = Date.now()
      if (lastEnterTime.current && currentTime - lastEnterTime.current < 500) {
        // 2回目のEnter押下 (500ms以内)
        handleSend()
        lastEnterTime.current = null // リセット
      } else {
        // 1回目のEnter押下
        lastEnterTime.current = currentTime
      }
    }
  }

  return (
    <div className="p-2 border-t border-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-t">
      {/* 入力欄 */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          adjustTextareaHeight()
        }}
        onKeyDown={handleKeyDown}
        className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white resize-none outline-none"
        rows={1}
        placeholder="Type a message..."
      />
      {/* ボタンエリア */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSend}
          disabled={isSubmitting || !message.trim()}
          className={`p-2 rounded ${
            isSubmitting || !message.trim()
              ? 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 dark:bg-blue-600 text-white'
          }`}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
