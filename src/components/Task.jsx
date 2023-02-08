import { useState } from "react";
import { RiEditFill as EditIcon } from "react-icons/ri";

const Task = ({ value, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(value.task);

  const HandleSubmit = (e) => {
    onEdit(value.id, newValue);
    setIsEdit(false);
  };

  const HandleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setNewValue(value);
  };

  const HandleClickEdit = () => {
    onEdit(value.id, newValue);
    setIsEdit(false);
  };

  return (
    <div className="todo">
      {isEdit ? (
        <form className="todoEditForm" onSubmit={HandleSubmit}>
          <input
            type="text"
            className="todoInput"
            onChange={HandleChange}
            value={newValue}
          />
          <button className="todoEditButton" onClick={HandleClickEdit}>
            <EditIcon />
          </button>
        </form>
      ) : (
        <div className="todoInfo">
          {value.task}{" "}
          <button onClick={() => setIsEdit(true)}>
            <EditIcon />
          </button>
          <button
            className="todoDeleteButton"
            onClick={(e) => onDelete(value.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
