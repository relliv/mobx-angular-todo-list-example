/**
 * Note: The decorate API has been removed with v6, and needs to be replaced by makeObservable in the constructor of the targeted class.
 * @see: https://github.com/mobxjs/mobx/blob/main/packages/mobx/CHANGELOG.md#600
 */

import { observable, computed, action, makeObservable } from 'mobx';
import { ITodo, Todo, TodoStatus } from '../models/todo.model';

class Store {
  public constructor() {
    makeObservable(this, {
      todos: observable,
      filter: observable,
      addTodo: action,
      removeTodo: action,
      showAll: action,
      showCompleted: action,
      showActive: action,
      clearCompleted: action,
      setCompleteAll: action,
      filteredTodos: computed,
      uncompletedItems: computed,
      isAllComplete: computed,
    });
  }

  public todos: ITodo[] = [];

  public filter: TodoStatus | 'SHOW_ALL' = 'SHOW_ALL';

  public addTodo(todo: ITodo): void {
    this.todos.push(new Todo(todo));
  }

  public removeTodo(todo: ITodo): void {
    const index = this.todos.indexOf(todo);

    this.todos.splice(index, 1);
  }

  public showAll(): void {
    this.filter = 'SHOW_ALL';
  }

  public showCompleted(): void {
    this.filter = TodoStatus.COMPLETED;
  }

  public showActive(): void {
    this.filter = TodoStatus.ACTIVE;
  }

  public clearCompleted(): void {
    this.todos = this._filter(this.todos, TodoStatus.ACTIVE);
  }

  public setCompleteAll(value: boolean): void {
    this.todos.forEach((todo: ITodo) => todo.setCompleted(value));
  }

  get filteredTodos(): ITodo[] {
    return this.filter !== 'SHOW_ALL'
      ? this._filter(this.todos, this.filter)
      : this.todos;
  }

  get uncompletedItems(): number {
    return this._filter(this.todos, TodoStatus.ACTIVE).length;
  }

  get isAllComplete(): boolean {
    return this.todos.length > 0 && this.todos.every((todo) => todo.completed);
  }

  private _filter(todos: ITodo[], value: TodoStatus): ITodo[] {
    return todos.filter((todo: ITodo) =>
      value === TodoStatus.COMPLETED ? todo.completed : !todo.completed
    );
  }
}

export const TodoStore = new Store();
