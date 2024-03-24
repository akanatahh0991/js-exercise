export class Resource {
  doA() {}
  doB() {}
  /** リソース解放のため利用終了時に呼び出すこと */
  close() {}
}

/**
 * `Resource`インスタンスに対して`action`を行い、終了後に`close`を呼び出す。
 * @param {Resource} resource 
 * @param {Function} action 
 */
export function withResource(resource, action) {
  try {
    action(resource);
  } finally {
    resource.close()
  }
}