import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { AddTodo, LoadTodos } from '../../store/todo/todo.actions';
import { TodoState } from '../../store/todo/todo.state';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-organizer',
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './organizer.component.html',
  styleUrl: './organizer.component.scss'
})
export class OrganizerComponent implements OnInit {
  taskName: string = '';
  todos$: Observable<Todo[]>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(TodoState.getTodos);
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
}
