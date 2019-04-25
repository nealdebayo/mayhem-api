
import { Petition } from './petition.model';
import * as PetitionActions from './petition.actions';
import { HttpState, DEFAULT_HTTP_STATE } from '../common/common.model';

export interface PetitionState {
  petitions: Array<Petition>;
  createHttpState: HttpState;
  readHttpState: HttpState;
}

export const INITIAL_STATE: PetitionState = {
  petitions: new Array<Petition>(),
  createHttpState: DEFAULT_HTTP_STATE,
  readHttpState: DEFAULT_HTTP_STATE
};

export function petitionReducer(state: PetitionState = INITIAL_STATE, action: PetitionActions.ActionTypes): PetitionState {
  switch (action.type) {
    case PetitionActions.CREATE_PETITION_REQUEST:
      return {
        ...state,
        createHttpState: {
          isRequesting: true
        }
      };
    case PetitionActions.CREATE_PETITION_RESPONSE:
      return {
        ...state,
        petitions: [action.payload.createdPetition, ...state.petitions],
        createHttpState: {
          isRequesting: false
        }
      };
    case PetitionActions.CREATE_PETITION_ERROR:
      return {
        ...state,
        createHttpState: {
          isRequesting: false,
          error: action.payload
        }
      };
    case PetitionActions.READ_PETITION_REQUEST:
      return {
        ...state,
        readHttpState: {
          isRequesting: true
        }
      };
    case PetitionActions.READ_PETITION_RESPONSE:
      return {
        ...state,
        petitions: action.payload.petitions,
        readHttpState: {
          isRequesting: false
        }
      };
    case PetitionActions.READ_PETITION_ERROR:
      return {
        ...state,
        readHttpState: {
          isRequesting: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
}

