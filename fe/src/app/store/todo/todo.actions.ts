import { Action } from '@ngrx/store';
import { ToDoModel } from './todo.model';


export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export class CreateToDo implements Action {
  readonly type = CREATE_TODO;
  constructor(public payload: ToDoModel) {}
}

export class UpdateToDo implements Action {
  readonly type = UPDATE_TODO;
  constructor(public payload: ToDoModel) {}
}

export class DeleteToDo implements Action {
  readonly type = DELETE_TODO;
  constructor(public payload: {id: number}) {}
}

export type ActionTypes =
  | CreateToDo
  | UpdateToDo
  | DeleteToDo;
