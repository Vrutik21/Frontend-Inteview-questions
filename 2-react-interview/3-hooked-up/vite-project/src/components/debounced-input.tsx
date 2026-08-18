import { useEffect, useState, type ChangeEvent } from "react";
import useDebounce from "../hooks/use-debounce";

// Build a custom hook that delays updating a value until a specified time has passed after the last change.
const DebouncedInput = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const debouncedValue = useDebounce(inputText, 1000, () => {
    // Either make API call here OR
    console.log("Function call");
  });

  useEffect(() => {
    // OR make an API call here
  }, [debouncedValue]);

  return (
    <div>
      <p>{inputText}</p>
      <input
        type="text"
        value={inputText}
        placeholder="Type Something"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DebouncedInput;
