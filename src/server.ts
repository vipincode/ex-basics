import cors from 'cors';
import express, { urlencoded } from 'express';
import morgan from 'morgan';
import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';
import { validateRequestBody } from './utilities/validateRequestBody';
import { userSchema } from './schema/userSchema';

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
app.post('/user', validateRequestBody(userSchema), createNewUser);
app.post('/sign-in', validateRequestBody(userSchema), signIn);

export default app;
