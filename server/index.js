import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import initDatabase from './startUp/initDatabase.js';

import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import commentRoute from './routes/commentRoute.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });

    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vkbo75w.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB/MVE-Blog...');

    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
