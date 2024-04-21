import cors from 'cors';
import express, { urlencoded } from 'express';
import morgan from 'morgan';
import router from './router';
import { protect } from './modules/auth';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('Hello from express');

  res.status(200);
  res.json({ message: 'Hello!' });
});

app.use('/api', protect, router);

export default app;
