import { body, ValidationChain } from 'express-validator';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is required')
    .trim()
    .isString()
    .withMessage('Title must be a valid string'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is required')
    .isString()
    .withMessage('Date needs to be a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description must be a valid string'),
  body('priority')
    .trim()
    .isIn([Priority.low, Priority.normal, Priority.high])
    .withMessage(
      'Priority can only be\ '
      + `${Priority.low},\ `
      + `${Priority.normal}\ `
      + `or ${Priority.high}`
    ),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage(
      'Status can only be\ '
      + `${Status.todo},\ `
      + `${Status.inProgress}\ `
      + `or ${Status.completed}`
    ),
];