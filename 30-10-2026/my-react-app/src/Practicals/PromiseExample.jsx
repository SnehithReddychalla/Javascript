import { useState } from "react";

function PromiseExample() {
  const [message, setMessage] = useState("Click the button");

  function checkPromise() {
    setMessage("Loading...");

    const myPromise = new Promise((resolve, reject) => {
      const success = true;

      if (success) {
        resolve("Promise completed successfully!");
      } else {
        reject("Promise failed!");
      }
    });

    myPromise
      .then((result) => {
        setMessage(result);
      })
      .catch((error) => {
        setMessage(error);
      })
      .finally(() => {
        console.log("Promise finished");
      });
  }

  return (
    <div>
      <h1>Promise Example</h1>

      <button onClick={checkPromise}>
        Check Promise
      </button>

      <h3>{message}</h3>
    </div>
  );
}

export default PromiseExample;
