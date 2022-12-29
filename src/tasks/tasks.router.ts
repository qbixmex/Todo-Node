import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';

//* Fire the router function
const taskRouter: Router = Router();

taskRouter.get('/', taskController.getAll);
taskRouter.post('/', createValidator, taskController.createTask);

export default taskRouter;
