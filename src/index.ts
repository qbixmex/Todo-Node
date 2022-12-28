import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Task } from './tasks/tasks.entity';
import taskRouter from './tasks/tasks.router';

//* Instantiate express app
const app: Express = express();

//* Cross Origin Resource Sharing
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4000',
  ],
}));

//* Parse Request Body
app.use(express.json());

//* Morgan
app.use(morgan('dev'));

//* Helmet 
app.use(helmet());

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
  entities: [Task],
  synchronize: true,
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

//* ROUTES
app.use('/api/tasks', taskRouter);
