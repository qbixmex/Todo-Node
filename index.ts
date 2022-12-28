import express, { Express, Request, Response } from 'express';

//* Instantiate express app
const app: Express = express();

//* Define server port
const PORT = 4000;

//* Create root endpoint
app.get('/', (_request: Request, response: Response) => {
  response.send('Express + Typescript Server');
});

//* Start listening to the request on the defined port
app.listen(PORT, () => {
  console.log(`Server Running at: http://localhost:${PORT}`);
});
