import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://api.jsonbin.io/v3/b/67e6d3308561e97a50f4afd3';
  private masterKey = '$2a$10$P3z4Of4OloaLiYeNtRVSwu663226y1A8F0VKaMw5qegeV6N0L1vUa';
  // private apiUrl = 'https://api.jsonbin.io/v3/b/670f4afd3';
  // private masterKey = '$2a$10$P3z4Of4OloaLiYeNtRVSwu1vUa';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-Master-Key': this.masterKey,
      'Content-Type': 'application/json',
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<{ record: { todos: Todo[] } }>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map(response => response.record.todos || [])
    );
  }

  updateTodos(todos: Todo[]): Observable<any> {
    return this.http.put(this.apiUrl, { todos }, { headers: this.getHeaders() });
  }
}
