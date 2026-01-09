import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        reply: 'Message is required' 
      });
    }

    if (!GROQ_API_KEY) {
      return res.status(500).json({
        reply: 'GROQ_API_KEY is not set. Please add it to server/.env.'
      });
    }

    // Call Groq LLaMA (OpenAI-compatible API)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: message }
        ]
      })
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq API error:', groqResponse.status, errorText);
      return res.status(500).json({
        reply: 'Error from Groq API. Please check your API key and model name.'
      });
    }

    const groqData = await groqResponse.json();
    const text = groqData.choices?.[0]?.message?.content || 'No response from Groq model.';

    res.json({ reply: text });

  } catch (error) {
    console.error('Error:', error.message);
    
    res.status(500).json({ 
      reply: 'Error processing your request. Please try again.' 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});
