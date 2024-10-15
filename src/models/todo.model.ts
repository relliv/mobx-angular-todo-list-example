/**
 * Note: The decorate API has been removed with v6, and needs to be replaced by makeObservable in the constructor of the targeted class.
 * @see: https://github.com/mobxjs/mobx/blob/main/packages/mobx/CHANGELOG.md#600
 */

import { action, makeObservable, observable } from 'mobx';

export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface ITodo {
  title: string | null;
  completed: boolean;

  setCompleted: Function;
}

export class Todo implements ITodo {
  public title: string | null = null;
  public completed = false;

  constructor(todo: ITodo) {
    makeObservable(this, {
      title: observable,
      completed: observable,
      setCompleted: action,
    });

    this.title = todo.title;
    this.completed = todo.completed;
  }

  public setCompleted(value: boolean): void {
    this.completed = value;
  }
}
