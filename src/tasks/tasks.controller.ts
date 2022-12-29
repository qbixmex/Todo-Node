import { Request, Response } from 'express';
import { AppDataSource } from '../index';
import { Task } from './tasks.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

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
          date: 'DESC',
        },
      });

      //* Convert the tasks instance to an array of objects
      tasks = instanceToPlain(tasks) as Task[];
    } catch (_error) {
      return response
        .status(500)
        .json({ error: 'Internal Server Error'});
    }

    return response.status(200).json(tasks);
  }

  public async create(
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
    } catch (_error) {
      return response
        .status(500)
        .json({ error: 'Internal Server Error'});
    }

    return response.status(201).json(createdTask);
  }

  public async update(
    request: Request,
    response: Response
  ): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    //* Declare a variable to hold a task
    let task: Task | null;
    const requestId = request.body.id as string;
    const requestStatus = request.body.status as string;

    try {
      //* Fetch a single task using the repository
      //* and find the task
      task = await AppDataSource
        .getRepository(Task)
        .findOne({
          where: { id: requestId }
        });
    } catch (_error) {
      return response
        .status(500)
        .json({ error: 'Internal Server Error'});
    }

    //* Response 404 if task was not founded
    if (!task) {
      return response
        .status(404)
        .json({ error: `The task with given ID: "${requestId}" does not exist`});
    }

    //* Declare a variable for updatedTask
    let updatedTask: UpdateResult;

    try {
      //* Update Task
      updatedTask = await AppDataSource
        .getRepository(Task)
        .update(
          requestId,
          plainToInstance(Task, {
            status: requestStatus
          })
        );
    } catch (_error) {
      return response
        .status(500)
        .json({ error: 'Internal Server Error'});
    }

    //* Convert to plain object
    updatedTask = instanceToPlain(updatedTask) as UpdateResult;

    return response.status(200).json(updatedTask);
  }
}

export const taskController = new TasksController();
