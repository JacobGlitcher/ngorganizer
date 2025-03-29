import { State, Action, StateContext, Selector } from '@ngxs/store'
import { tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'

import { Todo } from '../../models/todo.model'
import { AddTodo, LoadTodos, DeleteTodo, UpdateCompletionTodo, FilterTodos } from './todo.actions'
import { TodoService } from '../../services/todo.service'

export interface TodoStateModel {
  todos: Todo[];
  filteredTodos: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    filteredTodos: [],
  },
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Selector()
  static getTodos(state: TodoStateModel): Todo[] {
    const todos = state.filteredTodos.length ? state.filteredTodos : state.todos

    return todos.sort((a: Todo, b: Todo) => Number(a.isCompleted) - Number(b.isCompleted))
  }

  @Selector()
  static getOnlyFilteredTodos(state: TodoStateModel): Todo[] {
    return state.filteredTodos;
  }

  @Selector()
  static getPageSize(state: TodoStateModel): number {
    return this.getTodos(state).length
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

  @Action(UpdateCompletionTodo)
  updateCompletionTodo(ctx: StateContext<TodoStateModel>, action: UpdateCompletionTodo) {
    const state = ctx.getState();
    const updatedTodos = state.todos.map(todo => {
      if (todo.id === action.id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    })

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

  @Action(FilterTodos)
  filterTodos(ctx: StateContext<TodoStateModel>, action: FilterTodos) {
    const state = ctx.getState();

    if (!action.searchTerm) {
      ctx.patchState({ filteredTodos: [] });
      return;
    }

    const updatedTodos = state.todos.filter(todo =>
      todo.name.toLowerCase().includes(action.searchTerm.toLowerCase())
    );

    ctx.patchState({ filteredTodos: updatedTodos });
  }
}
