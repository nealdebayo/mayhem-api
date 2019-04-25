import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverComponent } from './observer.component';

import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../store/app-store';
import { PetitionState } from '../../store/petition/petition.reducer';
import { DEFAULT_HTTP_STATE } from '../../store/common/common.model';

const mockPetitionState: PetitionState = {
  petitions: [
  ],
  createHttpState: DEFAULT_HTTP_STATE,
  readHttpState: DEFAULT_HTTP_STATE
};

describe('ObserverComponent', () => {
  let component: ObserverComponent;
  let fixture: ComponentFixture<ObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserverComponent ],
      imports: [
        StoreModule.forRoot(appReducers, {
          initialState: {
            petitions: mockPetitionState
          }
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
