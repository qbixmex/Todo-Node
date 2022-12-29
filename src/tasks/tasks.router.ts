import { Router } from 'express';
import { taskController } from './tasks.controller';
import * as validators from './tasks.validator';

//* Fire the router function
const taskRouter: Router = Router();

taskRouter.get('/tasks', taskController.getAll);
taskRouter.post('/tasks', validators.create, taskController.create);
taskRouter.patch('/tasks', validators.update, taskController.update);

export default taskRouter;
