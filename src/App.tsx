
import AddTodoForm from "./components/AddTodoForm"
import TodoList from "./components/TodoList"
import TodoSummary from "./components/TodoSummary"

import useTodo from "./hooks/useTodo"

function App() {
  const {
    todos,
    addTodo,
    setTodoCompleted,
    deletTodo,
    deleteAllCompletedTodos,
  } = useTodo();

  return (
    <>
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
    </>
  )
}

export default App
