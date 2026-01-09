import React from 'react'
import { useNavigate } from 'react-router-dom'

const Credits = () => {
  const navigate = useNavigate()

  const team = [
    {
      name: "Alice Johnson",
      role: "Lead Developer",
      avatar: "https://ui-avatars.com/api/?name=Alice+Johnson",
      bio: "Full-stack developer passionate about AI"
    },
    {
      name: "Bob Smith",
      role: "UI/UX Designer",
      avatar: "https://ui-avatars.com/api/?name=Bob+Smith",
      bio: "Creating beautiful and intuitive interfaces"
    },
    {
      name: "Carol Davis",
      role: "AI Engineer",
      avatar: "https://ui-avatars.com/api/?name=Carol+Davis",
      bio: "Machine learning specialist and prompt engineer"
    },
    {
      name: "David Wilson",
      role: "Backend Developer",
      avatar: "https://ui-avatars.com/api/?name=David+Wilson",
      bio: "Building scalable backend infrastructure"
    }
  ]

  const technologies = [
    { name: "React", icon: "⚛️" },
    { name: "Vite", icon: "⚡" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "OpenAI API", icon: "🤖" },
    { name: "Docker", icon: "🐳" }
  ]

  const acknowledgments = [
    "Thanks to the open-source community for incredible tools",
    "Special thanks to our beta testers for valuable feedback",
    "Inspired by modern AI applications and best practices",
    "Built with ❤️ for users who want to chat with AI"
  ]

  return (
    <div className='flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white overflow-y-auto'>
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
        <h1 className='text-4xl font-bold mb-2'>Credits & About</h1>
        <p className='text-gray-600 dark:text-gray-400'>Meet the team and learn about our project</p>
      </div>

      <div className='flex-1 p-6 max-w-4xl'>
        {/* About Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>About This Project</h2>
          <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
            AI Assistant is a modern, feature-rich chatbot application built to showcase the capabilities
            of conversational AI. Our goal is to provide users with a seamless, intuitive interface for
            interacting with advanced language models.
          </p>
          <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
            Whether you're looking for help with creative writing, coding problems, analysis, or just
            having a conversation, AI Assistant is here to help 24/7.
          </p>
        </section>

        {/* Team Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-6'>Our Team</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {team.map((member, index) => (
              <div
                key={index}
                className='border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-gray-900 transition'
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className='w-16 h-16 rounded-full mb-4'
                />
                <h3 className='text-lg font-bold mb-1'>{member.name}</h3>
                <p className='text-black dark:text-gray-400 font-semibold text-sm mb-2'>{member.role}</p>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-6'>Technologies Used</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
            {technologies.map((tech, index) => (
              <div
                key={index}
                className='border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition'
              >
                <p className='text-3xl mb-2'>{tech.icon}</p>
                <p className='font-semibold'>{tech.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Acknowledgments Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-6'>Acknowledgments</h2>
          <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
            <ul className='space-y-3'>
              {acknowledgments.map((ack, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <span className='text-black dark:text-white font-bold mt-1'>✓</span>
                  <p className='text-gray-700 dark:text-gray-300'>{ack}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer Section */}
        <section className='border-t border-gray-200 dark:border-gray-800 pt-8 pb-8'>
          <h2 className='text-2xl font-bold mb-4'>Get in Touch</h2>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className='flex gap-3'>
            <button className='bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition'>
              Contact Us
            </button>
            <button className='border border-black dark:border-white text-black dark:text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition'>
              Visit Website
            </button>
          </div>
        </section>

        {/* Version Info */}
        <div className='text-center text-sm text-gray-500 dark:text-gray-600 border-t border-gray-200 dark:border-gray-800 pt-6 mt-6'>
          <p>AI Assistant v1.0.0</p>
          <p>© 2024 AI Assistant. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Credits