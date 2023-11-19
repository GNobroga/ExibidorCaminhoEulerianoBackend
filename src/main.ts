import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const server = express();

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;

server.use(cors());
server.use(routes);

server.listen(SERVER_PORT, () => {
  console.log(`The server is open on http://localhost:${SERVER_PORT}`);
});