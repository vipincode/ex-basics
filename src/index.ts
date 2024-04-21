import * as dotenv from 'dotenv';
import app from './server';

dotenv.config();

app.listen(4000, () => {
  console.log('App is running on PORT: http://localhost:4000');
});
