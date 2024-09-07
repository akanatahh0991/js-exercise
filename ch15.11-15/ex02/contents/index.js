const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

class MaxRetryError extends Error {
  constructor() {
    super("max retry is executed but not success.");
  }
}
class TimeoutError extends Error {
  constructor() {
    super("timeout error");
  }
}

class ClientError extends Error {
  constructor(response) {
    super(`client error: statuscode=${response.status}`);
    this._response = response;
  }

  get response() {
    return this._response;
  }
}

class ServerError extends Error {
  constructor(response) {
    super(`server error: statuscode=${response.status}`);
    this._response = response;
  }

  get response() {
    return this._response;
  }
}

/**
 * `maxRetry`までリトライ処理をおこなう。
 * 以下の仕様に従う。
 * - `maxRetry`に0を指定した場合はリトライせず、`func`を即座に呼び出す。
 * - 受け取った関数 `func` を呼び出し、funcが値を返せばそこで終了する
 * - `func` が失敗した場合は以下の待ち時間後に `func` 呼び出しをリトライする
 * - 待ち時間は`func`の呼び出し回数に応じて1秒, 2秒, 4秒, ...と2倍に増えていく
 * - `maxRetry` 回リトライしても成功しない場合はそこで終了し、`TimeoutError`を返す。
 * - `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
 * - `func` の返り値が成功した場合はその値で解決したPromise、maxRetry回のリトライが失敗した場合は失敗したPromiseを返す。
 * @param {async () => any} func 処理。成功した場合は値を返すこと。
 * @param {(Error) => boolean} リトライ条件
 * @param {number} maxRetry 最大リトライ回数。0以上の整数値を指定すること。
 * @return {Promise<any>} 結果
 */
async function retryWithExponentialBackoff(func, retryCondition, maxRetry) {
  if (!Number.isInteger(maxRetry) || maxRetry < 0) {
    throw new TypeError(`invalid maxRetry: ${maxRetry}`);
  }

  async function retryFunc(count) {
    if (count >= maxRetry) {
      throw new MaxRetryError("max retry is executed but not success.");
    }
    try {
      return await func();
    } catch (e) {
      if (retryCondition(e)) {
        await new Promise((resolve) => setTimeout(resolve, 2 ** count * 1000));
        return retryFunc(count + 1);
      } else {
        throw e;
      }
    }
  }

  // 初回実行とリトライの実行
  return retryFunc(0);
}

/**
 * APIへのリクエストを実行する。
 * ただし、以下の共通処理をおこなう。
 * - API からステータスコード 500 番台のエラーレスポンスが返ってきた場合、リトライをおこなう。
 * - クエスト送出から`timeout`の時間以上経過してもレスポンスを受信できない場合はリクエストをキャンセルし、リクエストがタイムアウトする。
 * @param {number} timeoutMsec タイムアウト時間(msec)。デフォルトは3000msec。
 * @param {number} retry リトライ回数。０以上の整数値を指定すること。
 * @returns {Promise} 成功時はresponseが格納される。
 * 失敗時は以下のエラーが格納される。
 * - クライアントエラー時 - ClientError
 * - タイムアウト時 - TimeoutError
 * - それ以外のエラー時 - 上記以外のError
 */
async function requestApi(
  url,
  options = {},
  timeoutMSec = 3 * 1000,
  retry = 10
) {
  try {
    const response = await retryWithExponentialBackoff(
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, timeoutMSec);
        try {
          const res = await fetch(url, {
            signal: controller.signal,
            ...options,
          });
          console.log(
            `request: url=${url}, options=${options}, code=${res.status}`
          );
          if (res.ok) {
            return res;
          } else {
            if (res.status >= 500 && res.status <= 599) {
              throw new ServerError(res);
            } else {
              throw new ClientError(res);
            }
          }
        } finally {
          clearTimeout(timeoutId);
        }
      },
      (e) => {
        return e instanceof ServerError;
      },
      retry
    );
    return response;
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new TimeoutError();
    } else {
      throw e;
    }
  }
}

// ローディングを開始する関数
function startLoading() {
  const modal = document.getElementById("loadingModal");
  modal.style.display = "block";
}

// ローディングを停止する関数
function stopLoading() {
  const modal = document.getElementById("loadingModal");
  modal.style.display = "none"; 
}

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    startLoading();
    const response = await requestApi("/api/tasks");
    const result = await response.json();
    result.items.forEach((task) => {
      appendToDoItem(task);
    });
  } catch (e) {
    alert(`Error Occurred: ${e.message}`);
  } finally {
    stopLoading();
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  try {
    const response = await requestApi("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ name: todo }),
    });
    const task = await response.json();
    appendToDoItem(task);
  } catch (e) {
    alert(`Error Occurred: ${e.message}`);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.addEventListener("change", async () => {
    try {
      startLoading()
      const response = await requestApi(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: toggle.checked ? "completed" : "active",
        }),
      });
      console.log(response);
      const updatedTask = await response.json();
      label.style.textDecorationLine =
        updatedTask.status === "completed" ? "line-through" : "none";
    } catch (e) {
      toggle.checked = !toggle.checked;
      alert(`Error Occurred: ${e.message}`);
    } finally {
      stopLoading()
    }
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      startLoading()
      await requestApi(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      list.removeChild(elem);
    } catch (e) {
      alert(`Error Occurred: ${e.message}`);
    } finally {
      stopLoading()
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
