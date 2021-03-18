import React from "react";
import Items from "./Components/Items";
import Input from "./Components/Input";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import "./App.css";
import {
  addTodo,
  deleteTodo,
  isCompleteTodo,
  todoEditModeToggle,
  editTodo,
  setTodoToLS
} from "./redux/actions";

function App() {
  const todos = useSelector((state) => state.todoList.todoList);
  const dispatch = useDispatch();

  const titleCreator = () => {
    let activeTask = 0;
    todos.forEach((todo) => {
      if (todo.completed === false) {
        activeTask++;
      }
    })
    let lastDigit = +activeTask.toString().slice(-1);
    if (lastDigit === 1 && activeTask !== 11) {
      return `у Вас ${activeTask} задание`;
    } else if (![12,13,14].includes(activeTask) && lastDigit > 1 && lastDigit < 5) {
      return `у Вас ${activeTask} задания`
    } else {
      return `у Вас ${activeTask} заданий`
    }
  }

  useEffect(() => {
    dispatch(setTodoToLS());
  }, [dispatch, todos])

  useEffect(() => {
    document.title = titleCreator();
  })

  const addTodoElement = (text) => {
    dispatch(
      addTodo({
        id: Date.now(),
        text: text,
        completed: false,
        edit: false,
      })
    );
  };

  const deleteTodoElement = (id) => {
    dispatch(deleteTodo(id));
  };

  const completeTodo = (id) => {
    dispatch(isCompleteTodo(id));
  };

  const editTodoToggler = (id) => {
    dispatch(todoEditModeToggle(id));
  };

  const editTodoOff = (id) => (text) => {
    dispatch(editTodo(id, text));
  };

  return (
    <div className="todo">
      <h1 className="todo__title">Todo</h1>
      <Input
        className="todo__input"
        placeholder="Введите название дела"
        onEnter={addTodoElement}
      />
      <div className="todo-out">
        <p className="todo-out__title">
          {todos.length > 0 ? "Список дел:" : "Запланируй что-то)"}
        </p>
        <Items
          todos={todos}
          deleteTodo={deleteTodoElement}
          completeTodo={completeTodo}
          editTodoToggler={editTodoToggler}
          editTodoOff={editTodoOff}
        />
      </div>
    </div>
  );
}

export default App;
