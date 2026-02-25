// worker.js
self.onmessage = (e) => {
  let count = 0;
  const target = 5_000_000_000;

  function workChunk() {
    // thoda kaam
    for (let i = 0; i < 10_000_000; i++) {
      count++;
    }

    // progress bhejo
    self.postMessage({ type: "progress", value: count });

    // kaam bacha hai to continue
    if (count < target) {
      setTimeout(workChunk, 0); // IMPORTANT
    } else {
      self.postMessage({ type: "done", value: count });
    }
  }

  workChunk();
};
