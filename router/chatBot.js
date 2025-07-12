import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import { Router } from "express";
import chatData from '../model/chatData.js';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "YOUR_API_KEY" });
const router = new Router();

// Input sanitization helper
const sanitizeInput = (input) => {
   if (typeof input !== 'string') return '';
   return input.trim().replace(/[<>]/g, '');
};

router.post('/api/chat', async (req, res) => {
   const { prompt, username } = req.body;

   // Validate and sanitize required fields
   const sanitizedPrompt = sanitizeInput(prompt);
   const sanitizedUsername = sanitizeInput(username);

   if (!sanitizedPrompt || !sanitizedUsername) {
      return res.status(400).json({
         status: 'error',
         message: 'Both prompt and username are required and cannot be empty.'
      });
   }

   // Check prompt length
   if (sanitizedPrompt.length > 1000) {
      return res.status(400).json({
         status: 'error',
         message: 'Prompt is too long. Maximum 1000 characters allowed.'
      });
   }

   try {
      // Generate content
      const result = await ai.models.generateContent({
         model: "gemini-2.0-flash",
         contents: sanitizedPrompt,
         config: {
            systemInstruction: "You are a helpful Yoga Trainer. Answer the user's questions based on the provided prompt.Generate response of maximum 10 lines.",
         }

      });
      const response = result.text;

      // Save chat data
      const newChatData = new chatData({
         username: sanitizedUsername,
         question: sanitizedPrompt,
         answer: response
      });

      await newChatData.save();

      return res.status(200).json({
         status: 'success',
         message: response,
         timestamp: new Date().toISOString()
      });
   } catch (error) {
      console.error('Chat error:', error);

      // Handle specific Gemini API errors
      if (error.message?.includes('API_KEY')) {
         return res.status(500).json({
            status: 'error',
            message: 'Invalid API key configuration.'
         });
      }

      return res.status(500).json({
         status: 'error',
         message: 'Error requesting AI bot.',
         error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
   }
});

router.get('/api/history/:user', async (req, res) => {
   const user = req.params.user;
   try {
      const chat = await chatData.find({ username: user });

      return res.status(200).json({ status: 'success', message: 'Chats found', Chat: chat });
   } catch (err) {
      return res.status(500).json({ status: 'error', message: 'Error in finding chat.' });
   }
});

router.delete('/api/history/:user', async (req, res) => {
   const username = req.params.user;
   try {
      const result = await chatData.deleteMany({ username: username });

      if (result.deletedCount === 0) {
         return res.status(404).json({ status: 'error', message: 'No chat history found for the specified user.' });
      }

      return res.status(200).json({ status: 'success', message: 'Chat history deleted successfully.' });
   } catch (err) {
      return res.status(500).json({ status: 'error', message: 'Error in deleting history.' });
   }
})

export default router;