import { ToDoModel } from './todo.model';
import * as ToDo from './todo.actions';

export interface ToDoState {
  todos: Array<ToDoModel>;
}

export const INITIAL_STATE: ToDoState = {
  todos: []
};

/* exmaple dispatches:
{ type: 'CREATE_TODO', payload: {id: 0, description: 'Buy Milk', dueDate: '2018-08-08', isComplete: false} }
{ type: 'CREATE_TODO', payload: {id: 1, description: 'Buy Eggs', dueDate: '2018-08-08', isComplete: false} }
{ type: 'UPDATE_TODO', payload: {id: 0, isComplete: true} }
{ type: 'DELETE_TODO', payload: {id: 0} }
*/
export function todoReducer(state: ToDoState = INITIAL_STATE, action: ToDo.ActionTypes): ToDoState {
  switch (action.type) {
    case ToDo.CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case ToDo.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          return todo.id === action.payload.id ? todo = Object.assign({}, todo, action.payload) : todo;
        })
      };
    case ToDo.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo.id !== action.payload.id;
        })
      };
    default:
      return state;
  }
}

