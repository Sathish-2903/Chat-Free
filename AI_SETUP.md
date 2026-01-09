# 🚀 AI Integration Setup Guide

## What I've Created

✅ **Backend server** with Google Gemini AI integration
✅ **API endpoint** at `/api/chat` 
✅ **Proxy configuration** in Vite to connect frontend to backend
✅ **Environment setup** for API keys

## Step-by-Step Setup (5 minutes)

### Step 1: Get Your Free Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key in New Project"**
4. Copy the API key (starts with `AIza...`)

### Step 2: Install Server Dependencies

```bash
# Open a NEW terminal and navigate to server folder
cd server
npm install
```

### Step 3: Add Your API Key

1. Open `server/.env` file
2. Replace `your_google_api_key_here` with your actual API key:
   ```
   GOOGLE_API_KEY=AIzaSy...your_actual_key_here
   PORT=3001
   ```

### Step 4: Start the Backend Server

```bash
# In the server folder
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3001
📡 API endpoint: http://localhost:3001/api/chat
```

### Step 5: Start the Frontend (In Another Terminal)

```bash
# Open a NEW terminal
cd client
npm run dev
```

### Step 6: Test It! 🎉

1. Open http://localhost:5174 in your browser
2. Type a message and send it
3. You should get real AI responses from Google Gemini!

## How It Works

```
Your Browser (Frontend)
    ↓ sends message
Vite Dev Server (proxy /api → localhost:3001)
    ↓
Express Server (server/server.js)
    ↓ calls Google Gemini API
Google Gemini AI
    ↓ returns response
Your Browser (shows AI response with typing effect)
```

## Switching AI Providers

### Want to use OpenAI GPT-4 instead?

Edit `server/server.js` and replace the Gemini code with:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: message }]
  });

  res.json({ reply: response.choices[0].message.content });
});
```

Then:
```bash
npm install openai
# Add OPENAI_API_KEY to .env
```

### Want to use Claude?

See `client/API_INTEGRATION.md` for Anthropic Claude setup.

### Want FREE local AI (no API key needed)?

1. Install Ollama: https://ollama.ai
2. Run: `ollama run llama2`
3. Update `server/server.js` to use Ollama endpoint (see API_INTEGRATION.md)

## Troubleshooting

**"API key not configured"**
- Make sure you added your real API key to `server/.env`
- Restart the server after editing `.env`

**"Port already in use"**
- Change `PORT=3001` to `PORT=3002` in `server/.env`
- Update Vite proxy in `client/vite.config.js` accordingly

**"Cannot connect to server"**
- Make sure the backend server is running (`npm run dev` in server folder)
- Check that it's on port 3001 (you should see the 🚀 message)

**CORS errors**
- Server already has CORS enabled, but restart both servers if you see this

## Production Deployment

When ready to deploy:

**Backend**: Deploy to Vercel, Railway, Render, or any Node.js host
**Frontend**: Deploy to Vercel, Netlify, GitHub Pages

Update the API endpoint in production to point to your deployed backend URL.

## Need Help?

Check these files:
- `server/README.md` - Server documentation
- `client/API_INTEGRATION.md` - All AI provider examples
- Vite proxy is configured in `client/vite.config.js`
