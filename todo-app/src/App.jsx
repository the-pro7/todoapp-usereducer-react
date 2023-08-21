import { useReducer, useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import TaskItem from "./components/TaskItem";

export const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  CHECK: "check",
  EDIT: "edit",
  EDIT_DONE: "edit-done",
};

function App() {
  const reducer = (tasks, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        const newTask = {
          id: Date.now(),
          task: action.payload.task,
          checked: false,
          editing: false,
        };
        console.log(newTask);
        return [...tasks, newTask];
      case ACTIONS.CHECK:
        return tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, checked: !task.checked }
            : task
        );
      case ACTIONS.DELETE:
        return tasks.filter((task) => task.id !== action.payload.id);

      case ACTIONS.EDIT:
        return tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, editing: true }
            : { ...task, editing: false }
        );
      case ACTIONS.EDIT_DONE:
        return tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, editing: false, task: action.payload.task }
            : task
        );

      default:
        return tasks;
    }
  };

  const [task, setTask] = useState("");
  // const [edit, setEdit] = useState(null);
  const [tasks, dispatch] = useReducer(reducer, []);

  return (
    <div className="taskApp">
      <Form task={task} setTask={setTask} dispatch={dispatch} />
      {/* {console.log(tasks)} */}
      <ul className="tasks">
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            dispatch={dispatch}
            // edit={edit}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
