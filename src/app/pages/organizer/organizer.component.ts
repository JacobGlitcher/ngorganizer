import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import {
  AddTodo,
  LoadTodos,
  DeleteTodo,
  UpdateCompletionTodo
} from '../../store/todo/todo.actions';
import { TodoState } from '../../store/todo/todo.state';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-organizer',
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.scss'
})
export class OrganizerComponent implements OnInit {
  taskName: string = '';
  allTodos$: Observable<Todo[]>;
  activeTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;

  constructor(private store: Store) {
    this.allTodos$ = this.store.select(TodoState.getTodos);
    this.activeTodos$ = this.store.select(TodoState.getActiveTodos);
    this.completedTodos$ = this.store.select(TodoState.getCompletedTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadTodos());
  }

  addTask(): void {
    if (this.taskName.trim()) {
      this.store.dispatch(new AddTodo(this.taskName));
      this.taskName = ' ';
    }
  }

  onTaskDelete(id: string): void {
    this.store.dispatch(new DeleteTodo(id))
  }

  onTaskCompletionUpdate(id: string): void {
    this.store.dispatch(new UpdateCompletionTodo(id))
  }
}
