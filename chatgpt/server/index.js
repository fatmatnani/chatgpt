// Import required modules server
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import OpenAI from 'openai';

// Configure environment variables
env.config();

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure OpenAI API
const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

// Dummy route for testing
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Endpoint to interact with ChatGPT
app.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo",
        });

        //console.log("Response from OpenAI:", response.choices[0].message);
        //res.json({ message: response.choices[0].message });
        res.json({ message: response.choices[0].message.content });
    } catch (e) {
        console.error("Error calling OpenAI API:", e);
        res.status(500).send("Error processing your request");
    }
});



// Start server on specified port
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
