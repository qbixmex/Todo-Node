import { Request, Response } from 'express';
import { AppDataSource } from '../index';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { validationResult } from 'express-validator';

class TasksController { 
  public async getAll(
    _request: Request,
    response: Response
  ): Promise<Response> {
    //* Declare a variable to hold all tasks
    let tasks: Task[];

    try {
      //* Fetch all tasks using the repository
      tasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });

      //* Convert the tasks instance to an array of objects
      tasks = instanceToPlain(tasks) as Task[];

      return response.status(200).json(tasks);
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error'});
    }
  };

  public async createTask(
    request: Request,
    response: Response
  ): Promise<Response> {    
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    //* Create a new instance of the task
    //* Add the required properties to the Task object
    //* Add the new task to the database

    try {
      return response.status(200).json({ ok: true });
    } catch (_error) {
      return response.status(500).json({ error: 'Internal Server Error'});
    }
  };
}

export const taskController = new TasksController();
