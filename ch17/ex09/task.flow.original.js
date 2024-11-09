// @flow
/**
 * ユーザー
 */
export type User = {
  id: number,
  name: string,
};

/**
 * タスク
 */
export type Task = {
  title: string,
  completed: boolean,
  user: User,
};

function isUserObject(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    typeof obj['id'] === 'number' &&
    typeof obj['name'] === 'string'
  );
}

/**
 * 優先度
 */
export type Priority = 'low' | 'middle' | 'high';

export type PriorityTask = {
  title: string,
  completed: boolean,
  user: User,
  priority: Priority,
};

export class TaskManager {
  _tasks: Task[] = [];

  add(task: Task) {
    this._tasks.push(task);
  }

  completeTask(target: User | string) {
    if (isUserObject(target)) {
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else {
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  getTasks(predicate: ((Task) => boolean) | void): Array<Task> {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
  return priorityTask.priority === 'low' || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
export function not<T>(f: (T) => boolean): (T) => boolean {
  return (arg) => !f(arg);
}
