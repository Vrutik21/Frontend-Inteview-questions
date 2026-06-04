// Promises Polyfill

function PromisePolyfill(executer) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;

    if (typeof onResolve === "function") {
      onResolve(value);
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;

    if (typeof onReject === "function") {
      onReject(value);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (isFulfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }

    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }

    return this;
  };

  try {
    executer(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const examplePromise = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

examplePromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//   Promise.all polyfill
PromisePolyfill.allPolyfill = (promises) => {
  return new PromisePolyfill((resolve, reject) => {
    const results = [];

    if (!promises.length) {
      resolve(results);
      return;
    }

    let pending = results.length;

    promises.forEach((promise, idx) => {
      PromisePolyfill.resolve(promise).then((res) => {
        results[idx] = res;
        pending--;

        if (pending === 0) {
          resolve();
        }
      }, reject);
    });
  });
};

PromisePolyfill.allPolyfill([
  importantAction("R"),
  likeTheVideo("JS"),
  shareTheVideo("S"),
]);
