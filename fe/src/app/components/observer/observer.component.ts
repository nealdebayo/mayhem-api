import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app-store';
import { PetitionState } from 'src/app/store/petition/petition.reducer';
import * as PetitionActions from 'src/app/store/petition/petition.actions';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css']
})
export class ObserverComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  petitionState: PetitionState;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.select('petitions').subscribe(state => this.petitionState = state)
    );
    this.store.dispatch(new PetitionActions.ReadPetitionRequest());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
