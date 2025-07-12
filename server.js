import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import Express from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Routes from './router/routes.js';

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URL)
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
   });

// Define allowed origins
const allowedOrigins = [
   'https://aayuga-front-end.vercel.app',
   'http://localhost:5173',
   'http://localhost:3000'
];

// Configure CORS options
const corsOptions = {
   origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         console.warn(`Blocked request from origin: ${origin}`);
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true,
   optionsSuccessStatus: 200
};

// Use CORS middleware
app.use(cors(corsOptions));

// Body parser middleware with size limits
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
   next();
});

// Routes
app.use(Routes);

// Health check endpoint
app.get('/', (req, res) => {
   res.json({
      message: "Hello from Aayuga team!",
      status: "running",
      timestamp: new Date().toISOString()
   });
});

// 404 handler
app.use('*', (req, res) => {
   res.status(404).json({
      status: 'error',
      message: 'Route not found'
   });
});

// Global error handler
app.use((err, req, res, next) => {
   console.error('Global error handler:', err);
   res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
   });
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});