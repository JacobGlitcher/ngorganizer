import { State, Action, StateContext, Selector } from '@ngxs/store'
import { tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'

import { Todo } from '../../models/todo.model'
import { AddTodo, LoadTodos, DeleteTodo } from './todo.actions'
import { TodoService } from '../../services/todo.service'


export interface TodoStateModel {
  todos: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
  },
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Selector()
  static getTodos(state: TodoStateModel): Todo[] {
    return state.todos;
  }

  @Action(LoadTodos)
  loadTodos(ctx: StateContext<TodoStateModel>) {
    return this.todoService.getTodos().pipe(
      tap(todos => {
        ctx.patchState({ todos });
      })
    );
  }

  @Action(AddTodo)
  addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const state = ctx.getState();

    const newTodo: Todo = {
      id: uuidv4(),
      name: action.name,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTodos = [...state.todos, newTodo];

    ctx.patchState({ todos: updatedTodos });

    return this.todoService.updateTodos(updatedTodos);
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: DeleteTodo) {
    const state = ctx.getState();
    const updatedTodos = state.todos.filter(todo => todo.id !== action.id);

    ctx.patchState({ todos: updatedTodos });

    return this.todoService.updateTodos(updatedTodos);
  }
}
