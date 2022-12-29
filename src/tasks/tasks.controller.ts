import { AppDataSource } from '../';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

export class TasksController {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  public async getAll(): Promise<Task[]|void> {
    //* Declare a variable to hold all tasks
    let tasks: Task[];

    try {
      //* Fetch all tasks using the repository
      tasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      //* Convert the tasks instance to an array of objects
      tasks = instanceToPlain(tasks) as Task[];

      return tasks;
    } catch (error) {
      console.error(error);
    }
  };
}
