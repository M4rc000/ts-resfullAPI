import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './app/routes/index';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/items', itemRouter);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT} on: http://localhost:${PORT}`);
});
