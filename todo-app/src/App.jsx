import { useReducer, useState } from "react";
import "./App.scss";
import Form from "./components/Form";

function App() {
  const ACTIONS = {
    ADD: "add",
    DELETE: "delete",
    CHECK: "check",
  };

  const reducer = (tasks, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        const newTask = { id: crypto.randomUUID(), task: action.payload, checked: false };
        [...tasks, newTask];
        break;
      default: 
        return tasks
    }
  };

  const [task, setTask] = useState("");
  const [tasks, dispatch] = useReducer(reducer, []);

  return (
    <div className="taskApp">
      <Form task={task} setTask={setTask} dispatch={dispatch} />
      <ul className="tasks">
        {tasks?.map((task) => {
          <li key={task.id}>{task.task}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
