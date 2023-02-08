import React from "react";
import { useState } from "react";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Task from "./Task";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const HandleChange = (e) => {
    const value = e.target.value;
    setTask(value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const addTask = {
      id: crypto.randomUUID(),
      task: task,
      completed: false,
    };
    const temp = [...todos];
    temp.unshift(addTask);
    setTodos(temp);
    setTask("");
  };

  const HandleEdit = (i, v) => {
    const temp = [...todos];
    const item = temp.find((item) => item.id === i);
    item.task = v;
    setTodos(temp);
  };

  const HandleDelete = (i) => {
    const temp = todos.filter((item) => item.id !== i);
    setTodos(temp);
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
          <button type="submit" className="todoButton" onClick={HandleSubmit}>
            <AddIcon />
          </button>
        </form>
        <div className="todoList">
          {todos.length === 0 ? (
            <div className="todoEmpty">EMPTY</div>
          ) : (
            todos.map((value) => (
              <Task
                key={value.id}
                value={value}
                onEdit={HandleEdit}
                onDelete={HandleDelete}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
