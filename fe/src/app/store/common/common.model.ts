import { HttpErrorResponse } from '@angular/common/http';


export interface HttpState {
  isRequesting: boolean;
  error?: HttpErrorResponse;
}

export const DEFAULT_HTTP_STATE: HttpState = {
  isRequesting: false
};
