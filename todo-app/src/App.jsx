import { useReducer, useState } from "react";
import "./App.scss";
import Form from "./components/Form";
import TaskItem from "./components/TaskItem";

export const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  CHECK: "check",
  EDIT: "edit",
};

function App() {
  const reducer = (tasks, action) => {
    switch (action.type) {
      case ACTIONS.ADD:
        const newTask = {
          id: Date.now(),
          task: action.payload.task,
          checked: false,
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
        setEdit((prev) => !prev);
      // return tasks.map((task) => {
      //   task.id === action.payload.id ? { ...task, task: editValue } : task;
      // });
      // console.log(`edit ${edit ? "ready" : "not ready"}`, edit);

      default:
        return tasks;
    }
  };

  const [task, setTask] = useState("");
  const [edit, setEdit] = useState(false);
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
            edit={edit}
            // editValue={editValue}
            // setEditValue={setEditValue}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
