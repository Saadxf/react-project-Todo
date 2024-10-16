import { useState } from "react"
import { dummayData } from "./data/todos"
import AddTodoForm from "./components/AddTodoForm"
import TodoList from "./components/TodoList"
import TodoSummary from "./components/TodoSummary"

function App() {
  const [todos, setTodos] = useState(dummayData)

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => (todo.id === id ? { ...todo, completed } : todo)))
  }

  function addTodo(title: string) {
    setTodos(prevTodos => [
      {
        id: Date.now(),
        title,
        completed: false,
      },
      ...prevTodos
    ])
  }

  function deletTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  function deleteAllCompletedTodos() {
    setTodos(prevTodos => prevTodos.filter(todos => !todos.completed))
  }
  return (
    <main className="py-10 h-screen overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm
          onSubmit={addTodo}
        />
        <TodoList
          todos={todos}
          onCompletedChange={setTodoCompleted}
          onDelete={deletTodo}
        />
      </div>
      <TodoSummary
        todos={todos}
        deleteAllCompleted={deleteAllCompletedTodos}
      />
    </main>
  )
}

export default App
