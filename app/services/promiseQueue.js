
/**
 * Creates a queue of promise executors that resolve sequentally. When an executor resolves (or rejects), the next executor is called, and so on. Executors can
 * be added at any time.
 */
export class PromiseQueue {
  get length() {
    return this._executorQueue.length
  }

  constructor() {
    this._executorQueue = []
    this._awaitingEnqueueCallbacks = []
  }

  enqueue(executor) {
    return new Promise((resolve, reject) => {
      if (this._executorQueue.length === 0) {
        // Nothing in queue, run right away.
        // First add to queue, as this below will run for some time.
        this._executorQueue.push(executor)

        new Promise(executor).then(result => {
          // Forward result.
          resolve(result)

          // Remove executor from queue.
          this._executorQueue.splice(0, 1)

          // Signal that a queued item is ready, and queue can progress.
          this._awaitingEnqueueCallbacks.forEach(callback => callback())
        }).catch(err => {
          // Forward error.
          reject(err)

          // Remove executor from queue.
          this._executorQueue.splice(0, 1)

          // Signal that a queued item is ready, and queue can progress.
          this._awaitingEnqueueCallbacks.forEach(callback => callback())
        })
      } else {
        // There is already at least one running run call, wait for it.
        // First add to queue, as this below will run for some time.
        this._executorQueue.push(executor)

        // This callback will be invoked when the queue is progressing.
        let onQueueProgressCallback = () => {
          if (this._executorQueue[0] === executor) {
            // It is time.
            // Self delete this callback from the notification callbacks.
            this._awaitingEnqueueCallbacks.splice(this._awaitingEnqueueCallbacks.indexOf(onQueueProgressCallback), 1)

            // Execute promise.
            new Promise(executor).then(result => {
              // Forward result.
              resolve(result)

              // Remove executor from queue.
              this._executorQueue.splice(0, 1)

              // Signal that a queued item is ready, and queue can progress.
              this._awaitingEnqueueCallbacks.forEach(callback => callback())
            }).catch(e => {
              // Forward error.
              reject(e)

              // Remove executor from queue.
              this._executorQueue.splice(0, 1)

              // Signal that a queued item is ready, and queue can progress.
              this._awaitingEnqueueCallbacks.forEach(callback => callback())
            })
          }
        }

        this._awaitingEnqueueCallbacks.push(onQueueProgressCallback) // So that the callback will be called when a run call is ready.
      }
    })
  }

  clear() {
    this._executorQueue.length = 0
  }
}
