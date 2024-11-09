/**
 * ユーザーオブジェクトかどうか
 * @param {any} obj オブジェクト
 * @return {any} ユーザーオブジェクトかどうか
 */
function isUserObject(obj) {
    return (typeof obj === 'object' &&
        typeof obj['id'] === 'number' &&
        typeof obj['name'] === 'string');
}
/**
 * タスクマネージャー
 */
export class TaskManager {
    constructor() {
        this._tasks = [];
    }
    /**
     * タスクを追加する
     * @param {T} task タスク
     */
    add(task) {
        this._tasks.push(task);
    }
    /**
     * `target`に該当するタスクを完了にする
     * @param {User | string} target `User`またはタスクのタイトル
     */
    completeTask(target) {
        if (isUserObject(target)) {
            this._tasks
                .filter((t) => t.user === target)
                .forEach((t) => (t.completed = true));
        }
        else {
            this._tasks
                .filter((t) => t.title === target)
                .forEach((t) => (t.completed = true));
        }
    }
    /**
     * `predicate`でフィルタリングしたタスク一覧を取得する。
     * @param {function(T): boolean} predicate フィルタリング関数
     * @return {Array<T>} タスク一覧
     */
    getTasks(predicate) {
        if (predicate === undefined) {
            return this._tasks;
        }
        else {
            return this._tasks.filter(predicate);
        }
    }
}
/**
 * priority="low"または完了済のタスクを判定する
 * @param {PriorityTask} priorityTask 優先度タスク
 * @return {boolean} priority="low"または完了済のタスクかどうか
 */
export function isLowOrCompletedTask(priorityTask) {
    return priorityTask.priority === 'low' || priorityTask.completed;
}
/**
 * 判定関数の否定結果を返す関数を生成する
 *
 * @template T - 引数の型
 * @param {function(T): boolean} f - 判定関数
 * @return {function(T): boolean} - 判定関数の否定関数
 */
export function not(f) {
    return (arg) => !f(arg);
}
