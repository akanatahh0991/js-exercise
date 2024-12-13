import React, { useState } from 'react'

export const ChatInput: React.FC<{ onSubmit: (message: string) => Promise<void> }> = ({
  onSubmit
}) => {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSend = async (): Promise<void> => {
    let content = message
    if (file) {
      content += `\n\`\`\`\n${file.name}\n\`\`\``
    }
    onSubmit(content)
    setMessage('')
    setFile(null)
  }

  return (
    <div className="p-4 flex items-center bg-gray-100 dark:bg-gray-800">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mr-2" />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow border rounded p-2"
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="ml-2 bg-blue-500 text-white p-2 rounded">
        Send
      </button>
    </div>
  )
}
