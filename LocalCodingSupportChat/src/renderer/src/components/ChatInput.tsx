import React, { useState } from 'react'

export const ChatInput: React.FC<{ onSubmit: (message: string) => Promise<void> }> = ({
  onSubmit
}) => {
  const [message, setMessage] = useState('')
  const [height, setHeight] = useState(40)

  const handleSend = async (): Promise<void> => {
    if (message.trim()) {
      await onSubmit(message)
      setMessage('')
      setHeight(40)
    }
  }

  return (
    <div
      className="p-2 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-t-lg flex items-end"
      style={{ minHeight: height }}
    >
      <input
        type="file"
        className="mr-2"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setMessage((prev) => prev + `\n[File: ${e.target.files?.[0]?.name}]`)
          }
        }}
      />
      <textarea
        className="flex-grow resize-none bg-transparent outline-none p-2 rounded-md"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          setHeight(Math.min(120, 40 + e.target.scrollHeight - e.target.offsetHeight))
        }}
        style={{ height }}
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-500 text-white p-2 rounded-md flex-shrink-0"
      >
        Send
      </button>
    </div>
  )
}
