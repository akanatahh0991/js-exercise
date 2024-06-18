class AsyncQueue {
  constructor() {
    this.values = [];
    this.resolvers = [];
    this.closed = false;
  }

  equeue(value) {
    if (this.closed) {
      throw new Error();
    }
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve(value);
    } else {
      this.values.push(value);
    }
  }

  dequeue() {
    if (this.values.length > 0) {
      const value = this.values.shift();
      return Promise.resolve(value);
    } else if (this.closed) {
      return Promise.resolve(AsyncQueue.EOS);
    } else {
      return new Promise((resolve) => {
        this.resolvers.push(resolve);
      });
    }
  }

  close() {
    while (this.resolvers.length > 0) {
      this.resolvers.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  next() {
    return this.dequeue().then((value) =>
      value === AsyncQueue.EOS
        ? { value: undefined, done: true }
        : { value, done: false }
    );
  }
}

AsyncQueue.EOS = Symbol("end-of-stream");
