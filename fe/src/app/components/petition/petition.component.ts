import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import * as PetitionActions from '../../store/petition/petition.actions';
import { Petition } from '../../store/petition/petition.model';
import { PetitionState } from '../../store/petition/petition.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.css']
})

export class PetitionComponent implements OnInit, OnDestroy {

  // defenderList: string[];
  subscriptions: Subscription = new Subscription();
  petitionForm: FormGroup;
  selectedDefender: string;
  petitionState: PetitionState;

  constructor(public auth: AuthenticationService,
    private store: Store<PetitionState>,
    private actions: Actions,
    private toastr: ToastrService
  ) { }

  createForm() {
    this.petitionForm = new FormGroup({
      // defender: new FormControl('', Validators.compose([Validators.required])),
      charge: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(15)
      ])),
      punishment: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(15)
      ])),
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.actions
        .ofType(PetitionActions.CREATE_PETITION_RESPONSE)
        .subscribe((param) => {
          this.toastr.success('Submitted new charge.', 'Charge Submition', {
            positionClass: 'toast-top-center'
          });
          this.petitionForm.reset();
        })
    );
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickSubmit() {
    const petitionModel: Petition = new Petition();
    petitionModel.charge = this.petitionForm.value.charge;
    petitionModel.punishment = this.petitionForm.value.punishment;
    this.store.dispatch(new PetitionActions.CreatePetitionRequest(petitionModel));
  }

}
