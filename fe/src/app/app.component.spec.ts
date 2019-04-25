import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app-store';
import { ToDoState } from './store/todo/todo.reducer';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AuthenticationService } from './services/authentication.service';

const mockToDoState: ToDoState = {
  todos: [
    { id: 0, description: 'Buy Milk', dueDate: '2018-08-08', isComplete: false }
  ]
};

class MockAuth {
  isLoggedIn() {}
  logout() {}
  login() {}
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent
      ],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(appReducers, {
          initialState: {
            toDo: mockToDoState
          }
        }),
        FormsModule
      ],
      providers: [
        {provide: AuthenticationService, useClass: MockAuth}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
