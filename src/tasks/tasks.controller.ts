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
    const newTask = new Task();

    //* Add the required properties to the Task object
    newTask.title = request.body.title;
    newTask.date = request.body.date;
    newTask.description = request.body.description;
    newTask.priority = request.body.priority;
    newTask.status = request.body.status;
    
    //* Create instance variable
    let createdTask: Task;

    try {
      //* Get the Task repository and save newTask to database
      createdTask = await AppDataSource
        .getRepository(Task)
        .save(newTask);

      //* Convert the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;

      return response.status(201).json(createdTask);
    } catch (_error) {
      return response.status(500).json({ error: 'Internal Server Error'});
    }
  };
}

export const taskController = new TasksController();
