import { Action, ActionReducerMap } from '@ngrx/store';

import * as ToDo from './todo/todo.reducer';
import * as Petition from './petition/petition.reducer';

import { PetitionEffects } from './petition/petition.effects';

export interface AppState {
    toDo: ToDo.ToDoState;
    petitions: Petition.PetitionState;
}

export const appReducers: ActionReducerMap<AppState, Action> = {
    toDo: ToDo.todoReducer,
    petitions: Petition.petitionReducer
};

export const appEffects = [
    PetitionEffects
];
