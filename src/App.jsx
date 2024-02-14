import React from "react";
import "./index.css";

function App() {
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  function addTodo() {
    if (newTodo.trim() !== "") {
      const newTodoObject = {
        task: newTodo,
        startTime: startTime,
        endTime: endTime,
      };
      setTodos([...todos, newTodoObject]);
      setNewTodo("");
      setStartTime("");
      setEndTime("");
    }
  }

  function handleChange(setter) {
    return (event) => setter(event.target.value);
  }

  function deleteTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <>
      <h1>Todo</h1>
      <button onClick={addTodo}>Add Todo</button>
      <input type="text" onChange={handleChange(setNewTodo)} />
      <input type="text" onChange={handleChange(setStartTime)} />
      Uhr - <input type="text" onChange={handleChange(setEndTime)} />
      Uhr
      <div className="todo-row">
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.task} {todo.startTime} - {todo.endTime}
              <button onClick={deleteTodo}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
