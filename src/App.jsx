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
        isDone: false,
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

  function markAsDone(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].isDone = !updatedTodos[index].isDone;
    setTodos(updatedTodos);
  }

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <div className="text-white bg-gray-950 px-16 h-screen py-8">
      <p className="text-3xl">My Todo's</p>

      <div className="flex h-32 my-16 w-full">
        <div className="flex border border-gray-700 items-center rounded-2xl mr-8 w-full">
          <button
            onClick={addTodo}
            className="bg-violet-500 p-4 mr-8 ml-6 rounded-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </button>
          <div className="w-1/2 flex">
            <div className="w-16">
              <p className="mb-4">Todo:</p>
              <p>Time:</p>
            </div>

            <div className="w-full">
              <input
                className="bg-gray-800 pl-2 w-full mb-4"
                type="text"
                onChange={handleChange(setNewTodo)}
              />
              <input
                className="bg-gray-800 pl-2 w-16"
                type="text"
                onChange={handleChange(setStartTime)}
              />
              -
              <input
                className="bg-gray-800 pl-2 w-16"
                type="text"
                onChange={handleChange(setEndTime)}
              />
            </div>
          </div>
        </div>

        <div className="w-1/6 bg-orange-500 rounded-2xl mr-4 text-gray-950">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <p>{todos.length}</p>
            <p>Todos</p>
          </div>
        </div>

        <div className="w-1/6 bg-green-500 rounded-2xl text-gray-950">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <p>2</p>
            <p>Todo's</p>
            <p>Done</p>
          </div>
        </div>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li
            className={todo.isDone ? "text-black flex justify-between mb-4 border border-gray-700  shadow-violet-500 bg-green-500 px-4 py-4 rounded-2xl" : "flex justify-between mb-4 border border-gray-700  shadow-violet-500 bg-gray-900 px-4 py-4 rounded-2xl "}
            key={index}
          >
            <div className="flex">
              <div className="pr-4">
                {todo.startTime} - {todo.endTime}
              </div>
              {todo.task}
            </div>

            <div>
            <button onClick={() => markAsDone(index)} className="pr-4">Done</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
