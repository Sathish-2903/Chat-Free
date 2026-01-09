import React from 'react'

const Message = ({ message }) => {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
        isUser
          ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-none'
          : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-bl-none'
      }`}>
        <p className='text-sm leading-relaxed whitespace-pre-line'>{message.text}</p>
        <p className={`text-xs mt-1 ${
          isUser
            ? 'text-gray-300 dark:text-gray-600'
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}

export default Message