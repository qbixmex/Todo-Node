import { Router, Request, Response } from 'express';

//* Fire the router function
const taskRouter: Router = Router();

//* Create a default route
taskRouter.get('/', (_request: Request, response: Response) => {
  response.send("Express + Typescript Server");
});

export default taskRouter;