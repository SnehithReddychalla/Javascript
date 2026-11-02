import useCounter from "./useCounter.jsx";

export default function Counter() {
  const { count, increment } = useCounter();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}