import { useEffect, useRef, useState } from "react";

function App() {
  const workerRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    workerRef.current = new Worker(new URL("./csvWorker.js", import.meta.url));

    workerRef.current.onmessage = (e) => {
      if (e.data.type === "progress") {
        setProgress(e.data.value);
      }

      if (e.data.type === "done") {
        setResult(e.data);
      }
    };

    return () => workerRef.current.terminate();
  }, []);

  const fakeUpload = () => {
    // simulate big CSV
    const bigData = Array.from({ length: 50000 }, (_, i) => ({
      amount: Math.random() * 1000,
    }));

    setProgress(0);
    setResult(null);

    workerRef.current.postMessage(bigData);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CSV Processing (Real Life)</h2>

      <button onClick={fakeUpload}>Upload CSV</button>

      <p>Progress: {progress}%</p>

      {result && (
        <>
          <p>Valid Rows: {result.valid}</p>
          <p>Total Amount: ₹{Math.round(result.total)}</p>
        </>
      )}

      <hr />

      <h3>UI Test 👇</h3>
      <input
        value={typing}
        onChange={(e) => setTyping(e.target.value)}
        placeholder="Type while processing..."
      />
      <p>You typed: {typing}</p>
    </div>
  );
}

export default App;
