export class AddTodo {
  static readonly type = '[Todo] Add'
  constructor(public name: string) {}
}

export class LoadTodos {
  static readonly type = '[Todo] Load'
}
