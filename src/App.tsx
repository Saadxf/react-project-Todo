import { useState } from "react"
import TodoItem from "./components/TodoItem"
import { dummayData } from "./data/todos"
import AddTodoForm from "./components/AddTodoForm"

function App() {
  const [todos, setTodos] = useState(dummayData)

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => (todo.id === id ? { ...todo, completed } : todo)))
  }

  return (
    <main className="py-10 h-screen">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm/>
        <div className="space-y-2">
          {todos.map(todo => (
            <p key={todo.id} className="text-lg">
              <TodoItem
                todo={todo}
                onCompletedChange={setTodoCompleted}
              />
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
