import "./App.css";
import UseEffectHook from "./components/use-effect-hook";
import UseRefHook from "./components/use-ref-hook";
import UseStateHook from "./components/use-state-hook";

function App() {
  return (
    <div>
      <h2>Hooks Interview Questions in React</h2>
      <UseStateHook />
      <UseEffectHook />
      <UseRefHook />
    </div>
  );
}

export default App;
