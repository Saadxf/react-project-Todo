
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TodoSummary from "./TodoSummary";
import useTodo from "../../hooks/useTodo";



export default function Home() {
    const {
        todos,
        addTodo,
        setTodoCompleted,
        deletTodo,
        deleteAllCompletedTodos,
    } = useTodo();
    return (
        <div className="py-10 overflow-y-auto">
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
        </div>
    )
};
