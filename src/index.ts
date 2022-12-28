import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

//* Instantiate express app
const app: Express = express();

//* Environment Variables
dotenv.config();

//* Define server port
const PORT = process.env.PORT;

//* Define host
const HOST = process.env.HOST;

//* Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
});

//* Create root endpoint
app.get('/', (_request: Request, response: Response) => {
  response.send("Express + Typescript Server");
});

AppDataSource.initialize()
  .then(() => {
    //* Start listening to the request on the defined port
    app.listen(PORT, () => {
      console.log(`Server Running at: ${HOST}:${PORT}`);
    });
    console.log('Data Source has been initialized');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization');
    console.error('Error:', error);
  });


