const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

const GOOGLE_API_KEY = 'inbiaceibwubciuw'; // Chave de API do Google Cloud dentros das aspas

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

app.post('/gemini', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);

        res.json({ response: result.response.text() });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
