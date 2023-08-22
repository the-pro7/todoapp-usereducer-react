import { Suspense, lazy, useReducer, useState } from "react";
import "./App.scss";
import Form from "./components/Form";
// import TaskItem from "./components/TaskItem";

// Dynamically import the TaskItem components
const TaskItem = lazy(() =>
  import("./components/TaskItem").then((module) => {
    return { default: module.TaskItem };
  })
);

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
      <h1 className="appName">
        Tasker v1.1 <sup className="beta">BETA</sup>
      </h1>
      <Form task={task} setTask={setTask} dispatch={dispatch} />
      {tasks.length ? (
        <p className="tasks-added">
          Added {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </p>
      ) : (
        <p className="tasks-added">No tasks added</p>
      )}
      <ul className="tasks">
        <Suspense
          fallback={
            <p style={{ background: "transparent", textAlign: "center" }}>
              Adding task...
            </p>
          }
        >
          {tasks?.map((task) => (
            <TaskItem key={task.id} task={task} dispatch={dispatch} />
          ))}
        </Suspense>
      </ul>
    </div>
  );
}

export default App;
