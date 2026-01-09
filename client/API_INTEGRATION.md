# API Integration Guide

## Overview

The AI Assistant chatbot is ready to connect to various AI APIs. The chat interface sends messages to `/api/chat` and expects responses in a specific format.

## API Endpoint Contract

### Request Format
```javascript
{
  "message": "User's question or prompt"
}
```

### Response Format
```javascript
{
  "reply": "AI's response text"
  // OR
  "message": "AI's response text"
}
```

## Integration Examples

### 1. OpenAI API (GPT-3.5/GPT-4)

Create a backend endpoint (e.g., using Node.js/Express):

```javascript
// Backend: server.js or routes/chat.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000
    });

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ 
      reply: 'Error processing your request.' 
    });
  }
});
```

Frontend remains unchanged - it will work automatically!

### 2. Google Gemini API

```javascript
// Backend endpoint
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.json({
      reply: response.text()
    });
  } catch (error) {
    res.status(500).json({ 
      reply: 'Error: Unable to process request.' 
    });
  }
});
```

### 3. Anthropic Claude API

```javascript
// Backend endpoint
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }]
    });

    res.json({
      reply: response.content[0].text
    });
  } catch (error) {
    res.status(500).json({ 
      reply: 'Error: Unable to process request.' 
    });
  }
});
```

### 4. Hugging Face Inference API

```javascript
// Backend endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      method: 'POST',
      body: JSON.stringify({ inputs: message })
    });
    
    const result = await response.json();
    
    res.json({
      reply: result[0]?.generated_text || 'Unable to generate response'
    });
  } catch (error) {
    res.status(500).json({ 
      reply: 'Error processing request.' 
    });
  }
});
```

### 5. Ollama (Local LLM)

```javascript
// Backend endpoint - for local LLM using Ollama
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: message,
        stream: false
      })
    });
    
    const data = await response.json();
    
    res.json({
      reply: data.response
    });
  } catch (error) {
    res.status(500).json({ 
      reply: 'Error: Local LLM not available.' 
    });
  }
});
```

## Frontend Modification (Optional)

If you need to modify how the frontend sends messages, edit `src/Components/ChatBox.jsx`:

```javascript
const handleSendMessage = async () => {
  if (!inputValue.trim()) return

  // Add user message to UI
  const userMessage = {
    id: Date.now(),
    text: inputValue,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  setMessages(prev => [...prev, userMessage])
  setInputValue("")
  setIsLoading(true)
  setShowWelcome(false)

  try {
    // MODIFY THIS SECTION FOR YOUR API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputValue })
    })

    const data = await response.json()
    
    const botMessage = {
      id: Date.now() + 1,
      text: data.reply || data.message || "I couldn't process that.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, botMessage])
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = {
      id: Date.now() + 1,
      text: "Error: Unable to connect to the AI service.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, errorMessage])
  } finally {
    setIsLoading(false)
  }
}
```

## Backend Setup Examples

### Express.js with OpenAI

```javascript
// server.js
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat history for multi-turn conversations (optional)
const conversationHistory = {};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    // Initialize session history if needed
    if (!conversationHistory[sessionId]) {
      conversationHistory[sessionId] = [];
    }

    // Add user message to history
    conversationHistory[sessionId].push({
      role: 'user',
      content: message
    });

    // Get AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversationHistory[sessionId],
      max_tokens: 1000,
      temperature: 0.7
    });

    const assistantMessage = response.choices[0].message.content;

    // Add assistant response to history
    conversationHistory[sessionId].push({
      role: 'assistant',
      content: assistantMessage
    });

    // Keep history to last 10 messages
    if (conversationHistory[sessionId].length > 20) {
      conversationHistory[sessionId] = conversationHistory[sessionId].slice(-20);
    }

    res.json({
      reply: assistantMessage
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      reply: 'I encountered an error processing your request.'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Environment Variables (.env)

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Google Gemini
GOOGLE_API_KEY=...

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# Hugging Face
HF_API_KEY=hf_...

# Local variables
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5174
```

## Rate Limiting & Error Handling

```javascript
// Add rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per windowMs
});

app.post('/api/chat', limiter, async (req, res) => {
  // ... your code
});
```

## Deployment Considerations

1. **Security**
   - Never expose API keys in frontend code
   - Use environment variables on backend
   - Validate and sanitize user input
   - Implement authentication if needed

2. **Performance**
   - Add caching for repeated queries
   - Implement message streaming for long responses
   - Use connection pooling for databases

3. **Scaling**
   - Use load balancing
   - Implement message queues (Bull, RabbitMQ)
   - Cache responses appropriately

## Testing the Integration

Once your backend is running:

```bash
# Test with curl
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

## Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Add CORS middleware to backend |
| API key errors | Check environment variables |
| Timeout errors | Increase timeout limits |
| Rate limiting | Implement exponential backoff |
| Empty responses | Check API response format |

---

**Integration Complete!** Your chatbot is now connected to a real AI API.

For more help, see [FEATURES.md](FEATURES.md) and [QUICKSTART.md](QUICKSTART.md)
