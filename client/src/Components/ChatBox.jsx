import React, { useState, useEffect, useRef } from 'react'
import Message from './Message'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const ChatBox = () => {
  const { selectedChat, user, setChats } = useAppContext()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [streamingText, setStreamingText] = useState("")
  const [currentMessageId, setCurrentMessageId] = useState(null)
  const messagesEndRef = useRef(null)
  const abortControllerRef = useRef(null)
  const isPausedRef = useRef(false)

  // Format long AI responses as numbered points
  const formatAsPoints = (text) => {
    if (!text) return ''
    // Split by sentence boundaries
    const parts = text
      .split(/(?<=[.!?])\s+/)
      .map(part => part.trim())
      .filter(Boolean)

    if (parts.length <= 1) return text

    return parts
      .map((part, index) => `${index + 1}. ${part}`)
      .join('\n')
  }

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load chat messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || [])
      setShowWelcome(false)
    } else {
      setMessages([])
      setShowWelcome(true)
    }
  }, [selectedChat])

  const syncMessagesToChat = (updatedMessages) => {
    if (!selectedChat) return
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id ? { ...chat, messages: updatedMessages } : chat
      )
    )
  }

  // Simulate streaming text response (ChatGPT-like)
  const streamResponse = async (text) => {
    setIsTyping(true)
    const words = text.split(' ')
    let currentText = ''
    
    for (let i = 0; i < words.length; i++) {
      if (abortControllerRef.current?.signal.aborted) break
      // Pause streaming if user has pressed pause
      while (isPausedRef.current && !abortControllerRef.current?.signal.aborted) {
        // Small delay loop while paused
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      currentText += (i > 0 ? ' ' : '') + words[i]
      setStreamingText(currentText)
      await new Promise(resolve => setTimeout(resolve, 50)) // Typing speed
    }
    
    setIsTyping(false)
    setIsPaused(false)
    isPausedRef.current = false
    return currentText
  }

  const handleSendMessage = async (messageToSend = null) => {
    const message = messageToSend || inputValue
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => {
      const updated = [...prev, userMessage]
      syncMessagesToChat(updated)
      return updated
    })
    setInputValue("")
    setIsLoading(true)
    setShowWelcome(false)
    setStreamingText("")
    setIsPaused(false)
    isPausedRef.current = false
    
    abortControllerRef.current = new AbortController()

    try {
      setIsLoading(false)
      
      // Simulate API call - Replace with actual API endpoint
      let data
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
          signal: abortControllerRef.current.signal
        })
        data = await response.json()
      } catch (fetchError) {
        // Demo mode fallback - generates intelligent responses
        const demoResponses = [
          `Great question! ${message.includes('?') ? 'Let me help you with that.' : 'Here\'s what I think:'} This is a demo chatbot with advanced features including streaming responses, message regeneration, and conversation history. To unlock full AI capabilities, connect services like OpenAI GPT-4, Google Gemini, or Anthropic Claude through the API integration guide.`,
          `Interesting point about "${message}". This demo showcases modern chatbot UX patterns: real-time typing indicators, smooth animations, dark/light themes, and responsive design. For production use, integrate your preferred AI provider to enable context-aware conversations and intelligent responses.`,
          `I understand you're asking about: "${message}". This interface is ready for AI integration! The backend supports multiple providers (see API_INTEGRATION.md). Features include auto-scroll, keyboard shortcuts (Enter to send, Shift+Enter for newlines), and message persistence.`
        ]
        data = {
          reply: demoResponses[Math.floor(Math.random() * demoResponses.length)]
        }
      }
      
      const responseText = data.reply || data.message || "I couldn't process that. Please try again."
      const formattedResponse = formatAsPoints(responseText)
      
      // Stream the response
      const fullText = await streamResponse(formattedResponse)
      
      const botMessage = {
        id: Date.now() + 1,
        text: fullText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => {
        const updated = [...prev, botMessage]
        syncMessagesToChat(updated)
        return updated
      })
      setStreamingText("")
      setCurrentMessageId(botMessage.id)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted')
        setIsTyping(false)
        setStreamingText("")
      } else {
        console.error('Error sending message:', error)
        setIsLoading(false)
        setIsTyping(false)
        const errorMessage = {
          id: Date.now() + 1,
          text: "Error: Unable to connect to the AI service. Please try again.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => {
          const updated = [...prev, errorMessage]
          syncMessagesToChat(updated)
          return updated
        })
        setStreamingText("")
      }
    }
  }

  const handleStopGeneration = () => {
    abortControllerRef.current?.abort()
    setIsLoading(false)
    setIsTyping(false)
    setIsPaused(false)
    isPausedRef.current = false
    setStreamingText("")
  }

  const handleTogglePause = () => {
    // Only allow pause/resume while generating
    if (!isTyping && !isLoading) return
    setIsPaused(prev => {
      const next = !prev
      isPausedRef.current = next
      return next
    })
  }

  const handleRegenerateResponse = () => {
    if (messages.length < 2) return
    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user')
    if (lastUserMessage) {
      // Remove last bot response
      setMessages(prev => {
        const updated = prev.slice(0, -1)
        syncMessagesToChat(updated)
        return updated
      })
      handleSendMessage(lastUserMessage.text)
    }
  }

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text)
    // You can add a toast notification here
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='flex flex-col w-full h-screen bg-white dark:bg-black'>
      {/* Header */}
      <div className='border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-black dark:text-white'>
            {selectedChat ? selectedChat.name : 'AI Assistant'}
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Always here to help</p>
        </div>
        <div className='flex gap-3'>
          <button className='p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
          </button>
          <button className='p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2m0 7a1 1 0 110-2 1 1 0 010 2m0 7a1 1 0 110-2 1 1 0 010 2' />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {showWelcome ? (
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <div className='bg-gray-100 dark:bg-gray-900 p-8 rounded-lg'>
              <h2 className='text-3xl font-bold mb-4 text-black dark:text-white'>Welcome to AI Assistant</h2>
              <p className='text-gray-600 dark:text-gray-400 mb-6 max-w-md'>
                Start a new conversation or select an existing chat to continue. Ask me anything!
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800'>
                  <p className='font-semibold text-black dark:text-white mb-1'>💡 Creative</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>Get ideas and inspiration</p>
                </div>
                <div className='bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800'>
                  <p className='font-semibold text-black dark:text-white mb-1'>🔍 Analysis</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>Understand complex topics</p>
                </div>
                <div className='bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800'>
                  <p className='font-semibold text-black dark:text-white mb-1'>✍️ Writing</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>Improve your writing</p>
                </div>
                <div className='bg-white dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-800'>
                  <p className='font-semibold text-black dark:text-white mb-1'>⚡ Coding</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>Get coding help</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id}>
                <Message message={message} />
                {message.sender === 'bot' && (
                  <div className='flex gap-2 ml-2 mt-1'>
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      className='text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition'
                      title='Copy message'
                    >
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                      </svg>
                      Copy
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Streaming Response */}
            {isTyping && streamingText && (
              <div className='flex justify-start'>
                <div className='max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-bl-none'>
                  <p className='text-sm leading-relaxed'>{streamingText}<span className='animate-pulse'>▋</span></p>
                </div>
              </div>
            )}

            {/* Loading Animation */}
            {isLoading && !isTyping && (
              <div className='flex justify-start'>
                <div className='bg-gray-100 dark:bg-gray-900 px-4 py-3 rounded-lg rounded-bl-none'>
                  <div className='flex gap-1'>
                    <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></span>
                    <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></span>
                    <span className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-black'>
        <div className='flex gap-2 mb-2'>
          {messages.length > 0 && !isLoading && !isTyping && (
            <button
              onClick={handleRegenerateResponse}
              className='text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition'
            >
              <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
              </svg>
              Regenerate response
            </button>
          )}
        </div>
        <div className='flex gap-3 items-end'>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Type your message... (Shift+Enter for new line)'
            className='flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none max-h-32'
            rows={1}
            disabled={isLoading || isTyping}
          />
          {isLoading || isTyping ? (
            <div className='flex gap-2'>
              <button
                onClick={handleTogglePause}
                className='bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  {isPaused ? (
                    <path d='M8 5v14l11-7z' />
                  ) : (
                    <>
                      <rect x='6' y='5' width='4' height='14' />
                      <rect x='14' y='5' width='4' height='14' />
                    </>
                  )}
                </svg>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={handleStopGeneration}
                className='bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <rect x='6' y='6' width='12' height='12' />
                </svg>
                Stop
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className='bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2m0 0v-8' />
              </svg>
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatBox