import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap, map, catchError, throttleTime } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import * as Petition from './petition.actions';
import { CreatePetitionsResponse, ReadPetitionsResponse } from './petition.model';
import { AuthenticationService } from '../../services/authentication.service';


@Injectable()
export class PetitionEffects {

  // Wait 5 seconds before allowing another read request
  private readonly readThrottleTime: number = 5 * 1000;

  @Effect()
  public requestCreate: Observable<Action> = this.actions.pipe(
    ofType(Petition.CREATE_PETITION_REQUEST),
    mergeMap((action: Petition.CreatePetitionRequest) =>
      this.http.post(this.buildUrl(), action.payload, this.buildReadHeaders()).pipe(
        map((response: CreatePetitionsResponse) => new Petition.CreatePetitionResponse(response)),
        catchError(error => of(new Petition.CreatePetitionError(error)))
      )
    )
  );

  @Effect()
  public requestRead: Observable<Action> = this.actions.pipe(
    ofType(Petition.READ_PETITION_REQUEST),
    throttleTime(this.readThrottleTime),
    switchMap((action: Petition.ReadPetitionRequest) =>
      this.http.get(this.buildUrl()).pipe(
        map((response: ReadPetitionsResponse) => new Petition.ReadPetitionResponse(response)),
        catchError(error => of(new Petition.ReadPetitionError(error)))
      )
    )
  );

  constructor(private http: HttpClient, private actions: Actions, private auth: AuthenticationService) {}

  private buildUrl() {
    return `${environment.protocol}://${environment.host}:${environment.port}/${environment.context}/petitions`;
  }

  private buildReadHeaders() {
    return { headers: { Authorization: `Bearer ${this.auth.getToken()}` } };
  }
}
