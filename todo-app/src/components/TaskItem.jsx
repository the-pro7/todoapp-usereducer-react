import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ACTIONS } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export const TaskItem = ({ task, dispatch }) => {
  const [editValue, setEditValue] = useState(task.task);
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
        task.editing ? (
          <input
            type="text"
            className="edit-task"
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              dispatch({
                type: ACTIONS.EDIT,
                payload: { task: editValue, id: task.id },
              });
            }}
            onBlur={() => {
              dispatch({
                type: ACTIONS.EDIT_DONE,
                payload: { id: task.id, task: editValue },
              });
            }}
          />
        ) : (
          <p style={{ display: "inline", textTransform: "capitalize" }}>
            {task.task}
          </p>
        )
      ) : (
        <s style={{ color: "lightgray", textTransform: "capitalize" }}>
          {task.task}
        </s>
      )}
      <div className="functional-buttons">
        <button
          className="edit"
          onClick={() => {
            dispatch({ type: ACTIONS.EDIT, payload: { id: task.id } });
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="delete"
          onClick={() => {
            dispatch({ type: ACTIONS.DELETE, payload: { id: task.id } });
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <div className="tooltip-text">Delete Task</div>
        </button>
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  // edit: PropTypes.bool.isRequired,
};

// export default TaskItem;
