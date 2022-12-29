import { Router, Request, Response } from 'express';
import { TasksController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validationResult } from 'express-validator';

//* Fire the router function
const taskRouter: Router = Router();

//* Create a default route
taskRouter.get('/', async (_request: Request, response: Response) => {
  const taskController = new TasksController();
  const tasks = await taskController.getAll();

  response.status(200).json(tasks);
});

taskRouter.post(
  '/',
  createValidator,
  async (request: Request, response: Response)  => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    return response.status(200).json({ ok: true });
  }
);

export default taskRouter;
