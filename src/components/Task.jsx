import { useState } from "react";
import {
  RiEditFill as EditIcon,
  RiDeleteBin6Line as DeleteIcon,
  RiCloseLine as CloseIcon,
} from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "top",
  icon: "success",
  showConfirmButton: false,
  timer: 1000,
});

const Task = ({ value, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(value.task);
  const [button, setButton] = useState(false);

  const HandleSubmit = () => {
      onEdit(value.id, newValue);
      setIsEdit(false);
  };

  const HandleChange = (e) => {
    const value = e.target.value;
    if(value === ""){
      setButton(true);
      setNewValue("");
    } else {
      setButton(false);
      setNewValue(value);
    }
  };

  return (
    <div className="todo">
      {isEdit ? (
        <form className="todoForm" onSubmit={HandleSubmit}>
          <input
            type="text"
            className="todoInput edit"
            onChange={HandleChange}
            value={newValue}
            placeholder="Edit this task"
          />
          <div className="todoButtons">
            <button disabled={button ? true : false} className="todoButton todoEdit" onClick={HandleSubmit}>
              <EditIcon />
            </button>
            <button
              className="todoButton todoDelete"
              onClick={() => setIsEdit(false)}
            >
              <CloseIcon />
            </button>
          </div>
        </form>
      ) : (
        <div className="todoForm edit">
          <p>{value.task}</p>{" "}
          <div className="todoButtons">
            <button
              className="todoButton todoEdit"
              onClick={() => setIsEdit(true)}
            >
              <EditIcon />
            </button>
            <button
              className="todoButton todoDelete"
              onClick={(e) => onDelete(value.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
