import React from "react";
import PropTypes from "prop-types";
import { ACTIONS } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const TaskItem = ({ task, dispatch }) => {
  return (
    <li key={task.id}>
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => {
          dispatch({ type: ACTIONS.CHECK, payload: { id: task.id } });
        }}
      />
      {!task.checked ? (
        <p style={{ display: "inline", textTransform: "capitalize" }}>
          {task.task}
        </p>
      ) : (
        <s style={{ color: "lightgray", textTransform: "capitalize" }}>
          {task.task}
        </s>
      )}
      <button
        className="delete"
        onClick={() => {
          dispatch({ type: ACTIONS.DELETE, payload: { id: task.id } });
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
        <div className="tooltip-text">Delete Task</div>
      </button>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TaskItem;
