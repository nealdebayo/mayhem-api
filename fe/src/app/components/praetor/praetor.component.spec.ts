import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraetorComponent } from './praetor.component';

describe('PraetorComponent', () => {
  let component: PraetorComponent;
  let fixture: ComponentFixture<PraetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
