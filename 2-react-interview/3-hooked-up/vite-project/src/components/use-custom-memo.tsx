/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState, type DependencyList } from "react";

type MemoizedValue<T> = {
  value: T;
  deps: DependencyList;
};

const useMemoPolyfill = <T,>(cb: () => T, deps: DependencyList) => {
  // handle variable or state changes for cached value
  // using ref because its value stays stored across the full lifecycle of the component
  const memoizedRef = useRef<MemoizedValue<T> | null>(null);

  // handle changes in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: cb(),
      deps,
    };
  }

  // handle cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the memoized value if any
  return memoizedRef.current!.value;
};

function areEqual(prevDeps: DependencyList, nextDeps: DependencyList) {
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) {
      return false;
    }
  }

  return true;
}

const CustomMemoUsage = () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(100);

  const memoizedSquaredValue = useMemoPolyfill(() => {
    console.log("Expensive calculation");

    return counter * counter;
  }, [counter]);

  return (
    <div>
      <h2>Counter : {counter}</h2>
      <h2>Squared Counter : {memoizedSquaredValue}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <h2>Counter 2 : {counter2}</h2>
      <button onClick={() => setCounter2(counter2 - 1)}>Decrement</button>
    </div>
  );
};

export default CustomMemoUsage;
