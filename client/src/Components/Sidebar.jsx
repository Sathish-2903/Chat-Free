import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { chats, setChats, setSelectedChat, theme, setTheme, user } = useAppContext()
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: 'New Chat',
      messages: [],
      createdAt: new Date()
    }
     setChats(prev => [...prev, newChat])
    setSelectedChat(newChat)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg'
      >
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-72 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'
        } lg:w-72 lg:opacity-100 lg:pointer-events-auto flex flex-col h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 absolute lg:relative z-40`}
      >
        
        {/* Header */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-800'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-bold text-black dark:text-white'>Chat Free</h1>
            <button
              onClick={() => setIsOpen(false)}
              className='lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className='w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition flex items-center justify-center gap-2'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-800'>
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600'
          />
        </div>

        {/* Chat History */}
        <div className='flex-1 overflow-y-auto p-3 space-y-2'>
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat)
                  setIsOpen(false)
                }}
                className='w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition group'
              >
                <p className='text-sm font-medium text-black dark:text-white truncate'>{chat.name}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  {chat.messages ? `${chat.messages.length} messages` : 'No messages'}
                </p>
              </button>
            ))
          ) : (
            <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-8'>No chats found</p>
          )}
        </div>

        {/* Footer */}
        <div className='border-t border-gray-200 dark:border-gray-800 p-4 space-y-2'>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition text-black dark:text-white'
          >
            {theme === 'dark' ? (
              <>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
                <span className='text-sm font-medium'>Light Mode</span>
              </>
            ) : (
              <>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
                </svg>
                <span className='text-sm font-medium'>Dark Mode</span>
              </>
            )}
          </button>

          {/* Navigation Links */}
          <button
            onClick={() => {
              navigate('/community')
              setIsOpen(false)
            }}
            className='w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition text-black dark:text-white'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
            <span className='text-sm font-medium'>Community</span>
          </button>

          <button
            onClick={() => {
              navigate('/credits')
              setIsOpen(false)
            }}
            className='w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition text-black dark:text-white'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span className='text-sm font-medium'>Credits</span>
          </button>

          {/* User Info */}
          {user && (
            <div className='pt-2 border-t border-gray-200 dark:border-gray-800'>
              <p className='text-xs font-medium text-gray-600 dark:text-gray-400 mb-2'>Logged in as</p>
              <p className='text-sm text-black dark:text-white font-semibold truncate'>{user.name}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar