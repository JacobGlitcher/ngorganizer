export class LoadTodos {
  static readonly type = '[Todo] Load'
}

export class AddTodo {
  static readonly type = '[Todo] Add'
  constructor(public name: string) {}
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete'
  constructor(public id: string) {}
}
