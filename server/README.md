# AI Chatbot Backend Server

Backend API server for the AI Assistant chatbot with Google Gemini integration.

## Quick Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Get Your Free Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 3. Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
GOOGLE_API_KEY=your_actual_api_key_here
PORT=3001
```

### 4. Start the Server
```bash
npm run dev
# Or for production:
npm start
```

Server will run on **http://localhost:3001**

### 5. Update Frontend
The frontend is already configured to use `/api/chat`. You just need to set up a proxy:

**Option A: Update Vite Config (Recommended)**
Edit `client/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

**Option B: Direct URL**
Or update the fetch URL in `client/src/Components/ChatBox.jsx`:
```javascript
const response = await fetch('http://localhost:3001/api/chat', {
  // ... rest of the code
})
```

## API Endpoint

### POST `/api/chat`

**Request:**
```json
{
  "message": "What is React?"
}
```

**Response:**
```json
{
  "reply": "React is a JavaScript library..."
}
```

## Switch to Other AI Providers

### OpenAI GPT-4
```bash
npm install openai
```

Update `server.js` (see `client/API_INTEGRATION.md` for code)

### Anthropic Claude
```bash
npm install @anthropic-ai/sdk
```

### Ollama (Local, Free)
```bash
# Install Ollama from https://ollama.ai
ollama run llama2
```

See `client/API_INTEGRATION.md` for complete integration examples.

## Troubleshooting

**API Key Error**: Make sure you copied your actual API key to `.env`
**Port in Use**: Change `PORT` in `.env` to another number (e.g., 3002)
**CORS Issues**: The server already has CORS enabled for all origins

## Production Deployment

Deploy to:
- **Vercel**: Serverless functions
- **Railway**: Full Node.js hosting
- **Render**: Free tier available
- **AWS/Azure**: Cloud platforms

See deployment guides in the main documentation.
