import Express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Routes from './router/routes.js'
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_URL);

app.use(bodyParser.json());
app.use(Routes);

app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`);
})