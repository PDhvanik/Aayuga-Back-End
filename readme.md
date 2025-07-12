# Aayuga

## Overview

Welcome to our dynamic MERN (MongoDB, Express.js, React, Node.js) application, a project built with a focus on secure user authentication, AI-driven user interaction, and advanced pose detection capabilities. This README file will guide you through the features, setup, and technologies used in our application.

## Features

- **Pose Detection:** Integrated pose detection for real-time body movement analysis.

- **Accuracy Measurements:** Accurate measurement of user poses for fitness and physical therapy applications.

- **Backend Development:** Utilizing Express.js for robust server-side architecture.

- **Security Enhancements:** Implemented advanced password hashing with bcrypt.

- **User Authentication:** Secure user authentication using JSON Web Tokens (JWT).

- **AI Chatbot Integration:** Integrated Google Gemini AI for enhanced user interaction.

## Technologies Used

- **MongoDB:** NoSQL database for storing user data and application information.

- **Express.js:** Backend framework for building RESTful APIs and handling server-side logic.

- **React:** Frontend library for building interactive and dynamic user interfaces.

- **Node.js:** JavaScript runtime for server-side development.

- **bcrypt:** Library for hashing passwords to enhance security.

- **JSON Web Tokens (JWT):** Standard for secure user authentication.

- **Google Gemini AI:** Google's AI API for incorporating AI chatbot functionality.

- **Pose Detection API:** API for detecting and analyzing body poses in real-time.

## Repositories

- **Frontend Repository:** [FrontEnd-Repo](https://github.com/PDhvanik/Aayuga-Front-End)

- **Backend Repository:** [BackEnd-Repo](https://github.com/PDhvanik/Aayuga-Back-End)

## Project Milestones

- **Pose Detection Integration:** Implemented pose detection for real-time analysis and accuracy measurements.

- **Backend Development:** Focused on setting up Express.js server and defining API routes.

- **Security Implementation:** Added password hashing with bcrypt and JWT-based authentication.

- **AI Integration:** Developed a chatbot using Google Gemini AI to enrich user interactions.

- **Frontend Integration:** Combined React frontend with Express.js backend to create a cohesive user experience.

## Installation and Setup

### Backend Setup

1. **Clone the backend repository:**

   ```bash
   git clone https://github.com/PDhvanik/Aayuga-Back-End.git
   cd Aayuga-Back-End
   ```

2. **Set up environment variables:**

   **Create a .env file in the backend directory and add the following:**

   ```env
   # Server Configuration
   PORT=8080
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URL=mongodb://localhost:27017/aayuga_chatbot

   # Google Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key_here

   # JWT Configuration (for authentication)
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Install dependencies and Start server:**

   ```bash
   npm install
   npm start
   ```

### Frontend Setup

1. **Clone the frontend repository:**

   ```bash
   git clone https://github.com/PDhvanik/Aayuga-Front-End.git
   cd Aayuga-Front-End
   ```

2. **Setup proxy server**

   **Add this code to vite.config file:**

   ```javascript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

   // https://vitejs.dev/config/
   export default defineConfig({
     server: {
       proxy: {
         "/api": "http://localhost:8080",
       },
     },
     //Other configuration as per requirements
   });
   ```

3. **Update URL.js File**

   ```javascript
   export default const URL = '';
   ```

4. **Install dependencies and Start Server**

   ```bash
   npm install
   npm run dev
   ```

## API Endpoints

### Chatbot API

- `POST /api/chat` - Send a message to the AI chatbot

  - Body: `{ "prompt": "your message", "username": "user123" }`
  - Response: `{ "status": "success", "message": "AI response", "timestamp": "..." }`

- `GET /api/history/:user` - Get chat history for a user

  - Response: `{ "status": "success", "data": [...], "count": 5 }`

- `DELETE /api/history/:user` - Delete chat history for a user
  - Response: `{ "status": "success", "deletedCount": 10 }`

## Access the Application

Open your browser and navigate to http://localhost:5173 to view the application. The backend server will be running on http://localhost:8080.

## Usage

- **User Registration and Login**: Securely register and log in users using JWT authentication.

- **AI Chatbot**: Interact with the integrated AI chatbot for an enhanced user experience.

- **Pose Detection**: Use the pose detection feature for real-time analysis of body movements.

- **Accuracy Measurements**: Obtain accurate measurements of poses for applications in fitness and physical therapy.

## Recent Improvements

- **Fixed Gemini AI Integration**: Corrected API usage and response handling
- **Enhanced Security**: Added input sanitization and validation
- **Improved Error Handling**: Better error messages and logging
- **Database Optimization**: Added timestamps and removed problematic unique constraints
- **API Consistency**: Standardized response formats across all endpoints
- **Performance**: Added request limits and better CORS configuration

## Contributing

We welcome contributions to improve our project. Feel free to submit issues and pull requests to the respective repositories.

## Authors

- [Dhvanik Patel](https://github.com/PDhvanik) - Backend Development, Pose detection using tensorflow and ChatBot using Google Gemini AI

- [Dev Patel](https://github.com/White-Devil04) - Frontend UI Development

## License

This project is licensed under the MIT License - see the LICENSE file in the respective repositories for details.

## Acknowledgments

- Special thanks to the Google AI team for the Gemini API.

- Gratitude to the LinkedIn community for support and feedback.
