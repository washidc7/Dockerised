// csvWorker.js
self.onmessage = (e) => {
  const rows = e.data; // large array
  let valid = 0;
  let total = 0;

  rows.forEach((row, index) => {
    // heavy logic
    if (row.amount > 0) {
      valid++;
      total += row.amount;
    }

    // progress update every 1000 rows
    if (index % 1000 === 0) {
      self.postMessage({
        type: "progress",
        value: Math.round((index / rows.length) * 100),
      });
    }
  });

  self.postMessage({
    type: "done",
    valid,
    total,
  });
};
