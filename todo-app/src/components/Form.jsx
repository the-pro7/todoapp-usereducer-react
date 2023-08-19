import React from "react";

const Form = ({ task, setTask, dispatch}) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({type: "add", payload: task})
    }
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="user-task"
        id="task"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
