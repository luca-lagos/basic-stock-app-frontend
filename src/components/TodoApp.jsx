import React from "react";
import { useState } from "react";
import {
  RiAddLine as AddIcon,
  RiErrorWarningLine as WarningIcon,
} from "react-icons/ri";
import Task from "./Task";
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

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [button, setButton] = useState(false);

  const HandleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setButton(true);
      setTask("");
    } else {
      setButton(false);
      setTask(value);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (task === "") {
      MySwal.fire({
        icon: "error",
        title: "Error :(",
        text: "Task cant be empty",
      });
    } else {
      const addTask = {
        id: crypto.randomUUID(),
        task: task,
        completed: false,
      };
      const temp = [...todos];
      temp.unshift(addTask);
      setTodos(temp);
      setTask("");
      Toast.fire({
        type: "success",
        title: "Your task has been created :)",
      });
    }
  };

  const HandleEdit = (i, v) => {
    const temp = [...todos];
    const item = temp.find((item) => item.id === i);
    item.task = v;
    setTodos(temp);
    Toast.fire({
      type: "success",
      title: "Task edited successfully",
    });
  };

  const HandleDelete = (i) => {
    MySwal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this task?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete this",
      confirmButtonColor: "rgb(247, 89, 89)"
    }).then((result) => {
      if (result.isConfirmed) {
        const temp = todos.filter((item) => item.id !== i);
        setTodos(temp);
        Toast.fire({
          type: "success",
          title: "Task deleted successfully",
        });
      }
    });
  };

  return (
    <>
      <div className="todoTitle">
        <h2>A simple todo list</h2>
      </div>
      <br />
      <div className="todoContainer">
        <form action="" className="todoForm" onSubmit={HandleSubmit}>
          <input
            onChange={HandleChange}
            type="text"
            name=""
            id=""
            className="todoInput"
            value={task}
          />
          <button
            disabled={button ? true : false}
            type="submit"
            className="todoButton"
            onClick={HandleSubmit}
          >
            <AddIcon />
          </button>
        </form>
        {todos.length === 0 ? (
          <div className="todoEmpty">
            <WarningIcon />
            <span>Tasks not found</span>
          </div>
        ) : (
          <>
            <hr />
            <div className="todoList">
              {todos.map((value) => (
                <Task
                  key={value.id}
                  value={value}
                  onEdit={HandleEdit}
                  onDelete={HandleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

export default TodoApp;
