async function _withDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("tasks", 1);
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore("tasks", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("name", "name");
      store.createIndex("status", "status");
    };
  });
}

export async function getTask(id) {
  const db = await _withDB();
  const transaction = db.transaction(["tasks"], "readonly");
  const tasks = transaction.objectStore("tasks");
  const request = tasks.get(id);

  return new Promise((resolve, reject) => {
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => {
      const record = event.target.result;
      resolve(record ? { id, name: record.name, status: record.status } : null);
    };
  });
}

export async function getAllTasks() {
  const db = await _withDB();
  const transaction = db.transaction("tasks", "readonly");
  const store = transaction.objectStore("tasks");
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const records = event.target.result;
      const tasks = records.map((record) => ({
        id: record.id,
        name: record.name,
        status: record.status,
      }));
      resolve(tasks);
    };

    request.onerror = (event) => reject(event.target.error);
  });
}

// 新しいタスクを追加する
// id を自動インクリメントで追加、status は "active" に設定
export async function addTask(name) {
  const db = await _withDB();
  const transaction = db.transaction(["tasks"], "readwrite");
  const tasks = transaction.objectStore("tasks");

  const newTask = { name, status: "active" };
  const request = tasks.add(newTask);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const id = event.target.result;
      resolve({ id, ...newTask });
    };
    request.onerror = (event) => reject(event.target);
  });
}

// 指定したidのタスクを削除する
export async function removeTask(id) {
  const db = await _withDB();
  const transaction = db.transaction(["tasks"], "readwrite");
  const tasks = transaction.objectStore("tasks");
  const request = tasks.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
}

// idで指定したタスクを更新する。updatedPropには更新するプロパティを含む。
export async function updateTask(id, updatedProp) {
  const db = await _withDB();
  const transaction = db.transaction(["tasks"], "readwrite");
  const tasks = transaction.objectStore("tasks");
  const request = tasks.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      const record = event.target.result;
      if (record) {
        // 更新するプロパティを適用
        const updatedRecord = { ...record, ...updatedProp };
        const updateRequest = tasks.put(updatedRecord);

        updateRequest.onsuccess = () => resolve(updatedRecord);
        updateRequest.onerror = (event) => reject(event.target.error);
      } else {
        reject(new Error(`id: ${id} is not exist `));
      }
    };
    request.onerror = (event) => reject(event.target.error);
  });
}
