import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PetitionComponent } from './petition.component';

import { AuthenticationService } from '../../services/authentication.service';

import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../store/app-store';
import { PetitionState } from '../../store/petition/petition.reducer';
import { DEFAULT_HTTP_STATE } from '../../store/common/common.model';
import { ToastrModule } from 'ngx-toastr';
import { Actions } from '@ngrx/effects';

const mockPetitionState: PetitionState = {
  petitions: [
    {
      _id: 'id',
      charge: 'this is the charge',
      punishment: 'this is the punishment',
      creator: 'creatorId'
    }
  ],
  createHttpState: DEFAULT_HTTP_STATE,
  readHttpState: DEFAULT_HTTP_STATE
};

class MockAuth {
  isLoggedIn() { return true; }
}

class MockActions {
  ofType() {
    return { subscribe: function() {}};
  }
}

describe('PetitionComponent', () => {
  let component: PetitionComponent;
  let fixture: ComponentFixture<PetitionComponent>;
  const text = 'this is sample string text of less than 250 characters to test charge and punishment form controls character limits.';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitionComponent ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(appReducers, {
          initialState: {
            petitions: mockPetitionState
          }
        })
      ],
      providers: [
        {provide: AuthenticationService, useClass: MockAuth},
        {provide: Actions, useClass: MockActions}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('form should not be valid for blank defender', async() => {
  //   component.petitionForm.controls['defender'].setValue('');
  //   component.petitionForm.controls['charge'].setValue('sample petition must go here');
  //   component.petitionForm.controls['punishment'].setValue('sample punishment must go here');
  //   expect(component.petitionForm.valid).toBeFalsy();
  // });

  it('form should not be valid for charge less than 15 characters', async() => {
    // component.petitionForm.controls['defender'].setValue('defender');
    component.petitionForm.controls['charge'].setValue('petition');
    component.petitionForm.controls['punishment'].setValue('sample punishment must go here');
    expect(component.petitionForm.valid).toBeFalsy();
  });

  it('form should not be valid for charge more than 250 characters', async() => {
    // component.petitionForm.controls['defender'].setValue('defender');
    component.petitionForm.controls['charge'].setValue(text + text + text);
    component.petitionForm.controls['punishment'].setValue('sample punishment must go here');
    expect(component.petitionForm.valid).toBeFalsy();
  });

  it('form should not be valid for punishment less than 15 characters', async() => {
    // component.petitionForm.controls['defender'].setValue('defender');
    component.petitionForm.controls['charge'].setValue('sample petition must go here');
    component.petitionForm.controls['punishment'].setValue('punishment');
    expect(component.petitionForm.valid).toBeFalsy();
  });

  it('form should not be valid for punishment more than 250 characters', async() => {
    // component.petitionForm.controls['defender'].setValue('defender');
    component.petitionForm.controls['charge'].setValue('sample petition must go here');
    component.petitionForm.controls['punishment'].setValue(text + text + text);
    expect(component.petitionForm.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    // component.petitionForm.controls['defender'].setValue('defender');
    component.petitionForm.controls['charge'].setValue(text);
    component.petitionForm.controls['punishment'].setValue(text);
    expect(component.petitionForm.valid).toBeTruthy();
  });

});
