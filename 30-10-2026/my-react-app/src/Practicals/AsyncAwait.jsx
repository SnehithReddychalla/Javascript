import { useState } from "react";

function AsyncAwait() {
  const [message, setMessage] = useState("");

  async function getData() {
    setMessage("Loading...");

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    setMessage("Data loaded successfully!");
  }

  return (
    <div>
      <h1>Async/Await Example</h1>

      <button onClick={getData}>
        Get Data
      </button>

      <p>{message}</p>
    </div>
  );
}

export default AsyncAwait;