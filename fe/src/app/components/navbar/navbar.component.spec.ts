import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation links', () => {
    let queryParam = 'ul a li'
    expect(de.nativeElement.querySelectorAll(queryParam)[0].textContent).toContain('Home');
    expect(de.nativeElement.querySelectorAll(queryParam)[1].textContent).toContain('Create Petition');
    expect(de.nativeElement.querySelectorAll(queryParam)[2].textContent).toContain('Adjudicate');
  });
});
