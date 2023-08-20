import React, { useRef } from "react";
import { ACTIONS } from "../App";

const Form = ({ task, setTask, dispatch }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: ACTIONS.ADD, payload: { task: task } });
    setTask("");
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="user-task"
        id="task"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" onClick={() => inputRef.current.focus()}>Add</button>
    </form>
  );
};

export default Form;
