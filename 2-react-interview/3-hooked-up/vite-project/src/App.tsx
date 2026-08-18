import "./App.css";
// import UseEffectHook from "./components/use-effect-hook";
// import UseRefHook from "./components/use-ref-hook";
// import UseStateHook from "./components/use-state-hook";
import useWindowSize from "./hooks/use-window-size";

function App() {
  // Custom useWindow hook implementation
  const { width, height } = useWindowSize();

  return (
    <div>
      <h2>Hooks Interview Questions in React</h2>
      {/* <UseStateHook />
      <UseEffectHook />
      <UseRefHook /> */}
      {/* Custom useWindow hook start*/}
      <p>Width : {width}</p>
      <p>Height : {height}</p>
      {/* Custom useWindow hook end*/}

      {/* Custom useDebounce hook start */}
      <DebouncedInput />
      {/* Custom useDebounce hook end */}
    </div>
  );
}

export default App;
