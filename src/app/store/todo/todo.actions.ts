export class LoadTodos {
  static readonly type = '[Todo] Load';
}

export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public name: string) {}
}

export class UpdateCompletionTodo {
  static readonly type = '[Todo] Update Completion';
  constructor(public id: string) {}
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete';
  constructor(public id: string) {}
}

export class FilterTodos {
  static readonly type = '[Todo] Filter';
  constructor(public searchTerm: string) {}
}
