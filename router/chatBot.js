import OpenAI from "openai";
import dotenv from 'dotenv';
import { Router } from "express";

dotenv.config();

const router = new Router();

const openai = new OpenAI({
   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

router.post('/api/chat', async (req, res) => {
   const { prompt } = req.body;
   try {
      const response = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [
            {
               role: "user",
               content: prompt
            }
         ],
         temperature: 1,
         max_tokens: 256,
         top_p: 1,
         frequency_penalty: 0,
         presence_penalty: 0,
      });

      return res.send(response.choices[0].message.content);
   } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: 'error', message: 'Error requesting AI bot.' });
   }
})

export default router;