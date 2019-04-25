import { Action } from '@ngrx/store';
import { Petition, CreatePetitionsResponse, ReadPetitionsResponse } from './petition.model';

import { HttpErrorResponse } from '@angular/common/http';

export const CREATE_PETITION_REQUEST = 'CREATE_PETITION_REQUEST';
export const CREATE_PETITION_RESPONSE = 'CREATE_PETITION_RESPONSE';
export const CREATE_PETITION_ERROR = 'CREATE_PETITION_ERROR';
export const READ_PETITION_REQUEST = 'READ_PETITION_REQUEST';
export const READ_PETITION_RESPONSE = 'READ_PETITION_RESPONSE';
export const READ_PETITION_ERROR = 'READ_PETITION_ERROR';

export class CreatePetitionRequest implements Action {
  readonly type = CREATE_PETITION_REQUEST;
  constructor(public payload: Petition) {}
}

export class CreatePetitionResponse implements Action {
  readonly type = CREATE_PETITION_RESPONSE;
  constructor(public payload: CreatePetitionsResponse) {}
}

export class CreatePetitionError implements Action {
  readonly type = CREATE_PETITION_ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export class ReadPetitionRequest implements Action {
  readonly type = READ_PETITION_REQUEST;
  constructor() {}
}

export class ReadPetitionResponse implements Action {
  readonly type = READ_PETITION_RESPONSE;
  constructor(public payload: ReadPetitionsResponse) {}
}

export class ReadPetitionError implements Action {
  readonly type = READ_PETITION_ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ActionTypes =
  | CreatePetitionRequest
  | CreatePetitionResponse
  | CreatePetitionError
  | ReadPetitionRequest
  | ReadPetitionResponse
  | ReadPetitionError;
