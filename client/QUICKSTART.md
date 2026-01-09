# AI Assistant Chatbot - Quick Start Guide

## ✨ What's New

Your AI chatbot has been completely redesigned with:

### 🎨 **Black & White Contrast Theme**
- Sleek, modern design with pure black and white colors
- Dark mode and light mode toggle
- Professional appearance suitable for all users
- High contrast for accessibility

### 🤖 **Advanced Chatbot Features**
1. **Full Chat Interface** - Send and receive messages in real-time
2. **Message History** - Keep track of all conversations
3. **Welcome Screen** - Beautiful introduction with feature cards
4. **Sidebar Navigation** - Easy access to chats and navigation
5. **Search Functionality** - Find chats quickly
6. **Community Page** - Connect with other users
7. **Credits Page** - Learn about the team and technologies

## 🚀 Running the Application

### Development Mode
```bash
cd client
npm run dev
```

The app will start on **http://localhost:5174/** (or next available port)

### Production Build
```bash
npm run build
npm run preview
```

## 📱 Key Features to Try

### Chat Features
- Click "New Chat" to start a conversation
- Type messages and press Enter to send (Shift+Enter for new lines)
- See real-time message responses
- View message timestamps
- Watch loading animations while waiting for responses

### Sidebar Features
- **Toggle Theme**: Click the sun/moon icon to switch dark/light mode
- **Search Chats**: Find conversations by name
- **Navigate**: Go to Community or Credits pages
- **Mobile Menu**: Hamburger menu on smaller screens

### Community Features
- Browse community posts by category
- Like and reply to posts
- See user profiles
- Create new posts

### Credits Features
- Meet the development team
- See technologies used
- Read acknowledgments
- Get contact information

## 🔧 Customization

### Connect Your AI API

Edit `src/Components/ChatBox.jsx` and replace the API endpoint:

```javascript
// Current: Demo endpoint
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: inputValue })
})

// Example: OpenAI integration
// const response = await fetch('https://api.openai.com/v1/chat/completions', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${API_KEY}`
//   },
//   body: JSON.stringify({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: inputValue }]
//   })
// })
```

### Change Colors

Update colors in your Tailwind CSS classes:
- `bg-black dark:bg-white` - Background colors
- `text-black dark:text-white` - Text colors
- `border-gray-200 dark:border-gray-800` - Border colors

## 📁 Project Structure

```
client/
├── src/
│   ├── App.jsx                 # Main application
│   ├── index.css               # Global styles
│   ├── main.jsx                # Entry point
│   ├── Components/
│   │   ├── ChatBox.jsx         # Chat interface
│   │   ├── Message.jsx         # Message display
│   │   └── Sidebar.jsx         # Navigation
│   ├── Pages/
│   │   ├── Community.jsx       # Community page
│   │   ├── Credits.jsx         # Credits page
│   │   └── Loading.jsx         # Loading screen
│   ├── context/
│   │   └── AppContext.jsx      # State management
│   └── assets/
│       └── assets.js           # Image assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 User Flow

1. **Welcome Screen** - User sees beautiful intro with feature cards
2. **Chat Interface** - User types a message
3. **Message Sent** - User sees their message appear
4. **AI Response** - Loading animation plays
5. **Response Received** - Bot message displays with timestamp
6. **Chat History** - Message appears in sidebar
7. **Explore** - User can browse Community or Credits

## 💡 Tips

- Use Shift+Enter to create multi-line messages
- Theme preference is saved to localStorage
- Messages automatically scroll to show latest
- Hover over buttons to see visual feedback
- All pages are responsive - works on mobile too!

## 🐛 Troubleshooting

### Port Already in Use
Vite automatically tries the next available port. Check the terminal output for the correct URL.

### Messages Not Showing
- Make sure you're hitting Enter to send
- Check that the API endpoint is reachable
- Open browser console (F12) for error messages

### Theme Not Changing
- Clear browser cache
- Check localStorage is enabled
- Refresh the page

## 📧 Need Help?

- Check the browser console (F12) for error messages
- Review `FEATURES.md` for detailed feature documentation
- All demo data is in `src/context/AppContext.jsx`

## 🎓 Next Steps

1. Connect a real AI API (OpenAI, Gemini, etc.)
2. Add user authentication
3. Implement chat persistence (database)
4. Add more community features
5. Deploy to production
6. Add more interactive features (voice, images, etc.)

---

**Happy Chatting! 🚀**

For detailed feature documentation, see [FEATURES.md](FEATURES.md)
