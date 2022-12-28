import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

//* Instantiate express app
const app: Express = express();

//* Environment Variables
dotenv.config();

//* Define server port
const PORT = process.env.PORT;

//* Define host
const HOST = process.env.HOST;

//* Create root endpoint
app.get('/', (_request: Request, response: Response) => {
  response.send("Express + Typescript Server");
});

//* Start listening to the request on the defined port
app.listen(PORT, () => {
  console.log(`Server Running at: ${HOST}:${PORT}`);
});
