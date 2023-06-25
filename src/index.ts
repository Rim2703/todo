import express from 'express';
import cors from 'cors';

import todoRoutes from './routes/todo';

const app = express();
app.use(express.json());
const port = 8000;

import mongoose, { ConnectOptions } from 'mongoose';

const mongooseOptions: ConnectOptions = {};

mongoose
  .connect('mongodb+srv://Rimsha:RimAtlas@cluster0.ij9mujl.mongodb.net/todo-app', mongooseOptions)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


app.use(cors());
app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
