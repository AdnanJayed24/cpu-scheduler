import { useState } from "react";

function App() {
  const [processes, setProcesses] = useState([]);
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [result, setResult] = useState(null);

  // Add process
  const addProcess = () => {
    if (!pid || arrival === "" || burst === "") return;

    setProcesses([
      ...processes,
      {
        pid,
        arrival: Number(arrival),
        burst: Number(burst),
      },
    ]);

    setPid("");
    setArrival("");
    setBurst("");
  };

  // FCFS Scheduling
  const simulateFCFS = () => {
    let time = 0;

    const sorted = [...processes].sort(
      (a, b) => a.arrival - b.arrival
    );

    const calculated = sorted.map((p) => {
      if (time < p.arrival) time = p.arrival;

      const waiting = time - p.arrival;
      const turnaround = waiting + p.burst;

      time += p.burst;

      return { ...p, waiting, turnaround };
    });

    const avgWaiting =
      calculated.reduce((sum, p) => sum + p.waiting, 0) /
      calculated.length;

    const avgTurnaround =
      calculated.reduce((sum, p) => sum + p.turnaround, 0) /
      calculated.length;

    setResult({
      processes: calculated,
      avgWaiting,
      avgTurnaround,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CPU Scheduling Simulator (FCFS)</h1>

      {/* Input Section */}
      <input
        placeholder="Process ID"
        value={pid}
        onChange={(e) => setPid(e.target.value)}
      />
      <input
        type="number"
        placeholder="Arrival Time"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
      />
      <input
        type="number"
        placeholder="Burst Time"
        value={burst}
        onChange={(e) => setBurst(e.target.value)}
      />
      <button onClick={addProcess}>Add Process</button>

      {/* Process Table */}
      <h3>Process List</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>PID</th>
            <th>Arrival</th>
            <th>Burst</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, i) => (
            <tr key={i}>
              <td>{p.pid}</td>
              <td>{p.arrival}</td>
              <td>{p.burst}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={simulateFCFS}>Simulate FCFS</button>

      {/* Result */}
      {result && (
        <>
          <h3>Result</h3>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>PID</th>
                <th>Waiting Time</th>
                <th>Turnaround Time</th>
              </tr>
            </thead>
            <tbody>
              {result.processes.map((p, i) => (
                <tr key={i}>
                  <td>{p.pid}</td>
                  <td>{p.waiting}</td>
                  <td>{p.turnaround}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            <strong>Average Waiting Time:</strong>{" "}
            {result.avgWaiting.toFixed(2)}
          </p>
          <p>
            <strong>Average Turnaround Time:</strong>{" "}
            {result.avgTurnaround.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
