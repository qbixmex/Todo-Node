import { Router, Request, Response } from 'express';
import { TasksController } from './tasks.controller';

//* Fire the router function
const taskRouter: Router = Router();

//* Create a default route
taskRouter.get('/', async (_request: Request, response: Response) => {
  const taskController = new TasksController();
  const tasks = await taskController.getAll();

  response.status(200).json(tasks);
});

export default taskRouter;
