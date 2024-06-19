import Express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Routes from './router/routes.js'
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
mongoose.connect(process.env.MONGODB_URL);
// Define allowed origins
const allowedOrigins = ['https://aayuga-front-end.vercel.app','http://localhost:5173'];

// Configure CORS options
const corsOptions = {
   origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   }
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(Routes);
app.get('/', (req, res) => {
   res.send({"Message":"Hello from Aayuga team!"})
});

app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`);
})