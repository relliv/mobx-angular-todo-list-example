/**
 * Note: The decorate API has been removed with v6, and needs to be replaced by makeObservable in the constructor of the targeted class.
 * @see: https://github.com/mobxjs/mobx/blob/main/packages/mobx/CHANGELOG.md#600
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MobxAngularModule } from 'mobx-angular';
import { TodoStore } from './stores/todo.store';
import { ITodo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main *mobxAutorun class="flex flex-col gap-3 p-5">
      <!-- Header -->
      <header>My Todo List {{ todoStore.isAllComplete ? '- All Done 🎉' : '(Left: ' + todoStore.uncompletedItems + ')' }}</header>

      <!-- Main Content -->
      <section>
        <ul class="flex flex-col gap-2">
          @for (todo of todoStore.filteredTodos; track $index) {
            <li
              [class]="{
                '!bg-yellow-500': todo.completed
              }"
              class="flex flex-row justify-between border border-gray-200 px-2 py-1 rounded-sm dark:hover:bg-gray-700"
            >
              <div class="flex flex-row gap-2">
                <input
                  class="toggle"
                  type="checkbox"
                  [checked]="todo.completed"
                  (change)="todo.setCompleted(!todo.completed)"
                />
                <label>{{ todo.title }}</label>
              </div>

              <button class="bg-rose-600 hover:bg-rose-500 px-3 text-xs rounded-[4px] justify-end text-white" (click)="todoStore.removeTodo(todo)">
                  Remove
                </button>
            </li>
          } @empty {
            <h1 class="bg-cyan-700 px-3 py-2 text-sm rounded-sm">
              No Todo Item
            </h1>
          }
        </ul>
      </section>

      <!-- Form -->
      <section>
          <div class="flex flex-row gap-2 w-full">
            <input #todoInput class="rounded-md px-2 py-2 text-xs dark:text-gray-800 w-full border border-gray-400 dark:bg-gray-700 dark:text-white" placeholder="todo" />
            <button class="px-2 py-1 bg-yellow-500 rounded-md dark:text-gray-700 text-xs" (click)="onAddClick()">Add</button>
        </div>
      </section>

      <!-- Other Actions -->
      <footer>
        <div class="flex flex-row gap-1">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            [checked]="todoStore.isAllComplete"
            (change)="todoStore.setCompleteAll(!todoStore.isAllComplete)"
          />
          <label for="toggle-all">Mark all as complete</label>
        </div>
      </footer>
    </main>
  `,
  imports: [MobxAngularModule],
})
export class App {
  @ViewChild('todoInput')
  private todoInput!: ElementRef;

  public readonly todoStore: typeof TodoStore = TodoStore;

  public constructor() {
    const initialTodos: ITodo[] = [
      <ITodo>{
        title: 'Wake up at',
        completed: false,
      },
      <ITodo>{
        title: 'Brush teeth',
        completed: false,
      },
      <ITodo>{
        title: 'Take a shower',
        completed: false,
      },
      <ITodo>{
        title: 'Get dressed',
        completed: false,
      },
      <ITodo>{
        title: 'Eat breakfast',
        completed: true,
      },
    ];

    initialTodos.forEach((todo: ITodo) => this.todoStore.addTodo(todo));
  }

  public onAddClick(): void {
    if (this.todoInput.nativeElement?.value) {
      this.todoStore.addTodo(<ITodo>{
        title: this.todoInput.nativeElement?.value,
        completed: false,
      });

      this.todoInput.nativeElement.value = '';
    }
  }
}

bootstrapApplication(App);
