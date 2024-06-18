export class PromisePool {
  _STATE = {
    UNSTARTED: "UNSTARTED",
    STARTED: "STARTED",
    STOPED: "STOPED",
  };

  /**
   * Constructs PromisePool.
   *
   * @param queuelength the max length of queue
   * @param maxRunningPromises the maximum number of running promises at the same time.
   *
   * @throws Error if either queuelength or maxRunningPromises is less than 1
   */
  constructor(queuelength, maxRunningPromises) {
    if (queuelength < 1 || maxRunningPromises < 1) {
      throw new TypeError("queuelength or maxRunningPromises is less than 1");
    }
    this._state = this._STATE.UNSTARTED;
    this._maxRequestQueuelength = queuelength;
    this._maxRunningPromises = maxRunningPromises;
    this._requestQueue = [];
    this._waitRequests = [];
  }

  /**
   * Starts PromisePool.
   *
   * @returns Promise, which will be rejected if this pool is already started
   */
  async start() {
    if (this._state !== this._STATE.UNSTARTED) {
      throw new Error("this pool is already started");
    }
    this._state = this._STATE.STARTED;
    return null;
  }

  /**
   * Wait all promises for their terminations.
   * All requests dispatched before this method is invoked must complete
   * and this method also will wait for their completion.
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async stop() {
    return new Promise((resolve) => {
      if (this._state !== this._STATE.STARTED) {
        throw new Error("this pool has not been started");
      }
      this._state = this._STATE.STOPED;
      this._waitRequests.forEach((waitRequest) => waitRequest.reject());
      this._waitRequests = [];
      this._stopResolver = resolve;
      this._executeNextPromise();
    });
  }

  /**
   * Executes the specified promise from the given factory using this pool.
   * If the queue is full, then the returned Promise will not be fulfilled until the queue is not full.
   *
   * @param promiseFactory the function that retuns Promsie
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async dispatch(promiseFactory) {
    return new Promise((resolve, reject) => {
      if (this._state !== this._STATE.STARTED) {
        reject(new Error("PromisePool is not started."));
      } else if (this._requestQueue.length >= this._maxRequestQueuelength) {
        this._waitRequests.push({
          promiseFactory,
          resolve,
          reject,
        });
      } else {
        this._requestQueue.push({
          promiseFactory,
          isExecuting: false,
        });
        this._executeNextPromise();
        resolve();
      }
    });
  }

  _executeNextPromise() {
    let index;
    if (
      this._requestQueue.filter((request) => request.isExecuting).length <
        this._maxRunningPromises &&
      (index = this._requestQueue.findIndex(
        (request) => !request.isExecuting
      )) !== -1
    ) {
      const request = this._requestQueue[index];
      request.isExecuting = true;
      request.promiseFactory().finally(() => {
        this._requestQueue.splice(index, 1);
        while (
          this._waitRequests.length > 0 &&
          this._requestQueue.length < this._maxRequestQueuelength
        ) {
          const waitRequest = this._waitRequests.shift();
          this._requestQueue.push({
            promiseFactory: waitRequest.promiseFactory,
            isExecuting: false,
          });
          waitRequest.resolve();
        }
        this._executeNextPromise();
      });
    }
    if (this._requestQueue.length === 0 && this._stopResolver !== undefined) {
      this._stopResolver();
      this._stopResolver = undefined;
    }
  }
}
