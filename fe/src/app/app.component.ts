import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './store/app-store';
import * as ToDoActions from './store/todo/todo.actions';
import { ToDoModel } from './store/todo/todo.model';
import { ToDoState } from './store/todo/todo.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  toDoState: ToDoState;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    // Select the toDo slice so that we can see the state data
    this.subscriptions.add(
      this.store.select('toDo').subscribe(state => this.toDoState = state)
    );

    // Add some data to the toDo slice
    const myToDo: ToDoModel = new ToDoModel();
    myToDo.id = 10;
    myToDo.description = 'Added on init';
    myToDo.dueDate = '2018-12-12';
    myToDo.isComplete = false;
    this.store.dispatch(new ToDoActions.CreateToDo(myToDo));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
