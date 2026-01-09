import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Community = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('general')

  const categories = [
    { id: 'general', name: 'General', icon: '💬' },
    { id: 'help', name: 'Help & Support', icon: '❓' },
    { id: 'feedback', name: 'Feedback', icon: '💡' },
    { id: 'showcase', name: 'Showcase', icon: '🎨' }
  ]

  const posts = [
    {
      id: 1,
      author: "Alice Johnson",
      avatar: "https://ui-avatars.com/api/?name=Alice+Johnson",
      title: "Tips for writing better prompts",
      content: "Here are some tips I've learned for getting better responses...",
      category: "general",
      replies: 12,
      likes: 45,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Bob Smith",
      avatar: "https://ui-avatars.com/api/?name=Bob+Smith",
      title: "How to use the API effectively",
      content: "I want to share my experience with the API integration...",
      category: "help",
      replies: 8,
      likes: 23,
      timestamp: "1 day ago"
    },
    {
      id: 3,
      author: "Carol Davis",
      avatar: "https://ui-avatars.com/api/?name=Carol+Davis",
      title: "Amazing use case I discovered",
      content: "Check out this interesting way I used the AI for...",
      category: "showcase",
      replies: 15,
      likes: 67,
      timestamp: "3 days ago"
    }
  ]

  const filteredPosts = posts.filter(post => post.category === selectedCategory)

  return (
    <div className='flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white'>
      {/* Header */}
      <div className='border-b border-gray-200 dark:border-gray-800 p-6'>
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back
        </button>
        <h1 className='text-3xl font-bold mb-2'>Community</h1>
        <p className='text-gray-600 dark:text-gray-400'>Connect with other users, share ideas, and get help</p>
      </div>

      <div className='flex flex-1 gap-6 p-6 max-md:flex-col'>
        {/* Sidebar */}
        <div className='w-48 max-md:w-full'>
          <button className='w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition mb-4'>
            Create Post
          </button>
          <div className='space-y-2'>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className='flex-1 space-y-4'>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div
                key={post.id}
                className='border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-lg dark:hover:shadow-gray-900 transition cursor-pointer'
              >
                <div className='flex gap-4'>
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className='w-12 h-12 rounded-full'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center justify-between mb-2'>
                      <div>
                        <h3 className='font-semibold'>{post.author}</h3>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{post.timestamp}</p>
                      </div>
                    </div>
                    <h2 className='text-lg font-bold mb-2'>{post.title}</h2>
                    <p className='text-gray-600 dark:text-gray-400 mb-3'>{post.content}</p>
                    <div className='flex gap-4 text-sm text-gray-500 dark:text-gray-400'>
                      <button className='flex items-center gap-1 hover:text-black dark:hover:text-white transition'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                        </svg>
                        {post.likes}
                      </button>
                      <button className='flex items-center gap-1 hover:text-black dark:hover:text-white transition'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
                        </svg>
                        {post.replies}
                      </button>
                      <button className='flex items-center gap-1 hover:text-black dark:hover:text-white transition ml-auto'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3' />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-12'>
              <p className='text-gray-500 dark:text-gray-400 mb-4'>No posts in this category yet</p>
              <button className='bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition'>
                Be the first to post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Community