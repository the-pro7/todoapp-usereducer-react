import React, { useRef } from "react";
import { ACTIONS } from "../App";
import PropTypes from "prop-types";

const Form = ({ task, setTask, dispatch }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    task
      ? dispatch({ type: ACTIONS.ADD, payload: { task: task } })
      : alert("You cannot add an empty task");
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
      <button type="submit" onClick={() => inputRef.current.focus()}>
        Add
      </button>
    </form>
  );
};

Form.propTypes = {
  task: PropTypes.string.isRequired,
  setTask: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Form;
