
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TodoSummary from "./TodoSummary";
import useTodo from "../../hooks/useTodo";
import { Skeleton } from "../ui/skeleton";



export default function Home() {
    const {
        todos,
        isLoading,
        addTodo,
        setTodoCompleted,
        deleteTodo,
        deleteAllCompletedTodos,
    } = useTodo();
    return (

        <div className="py-10 overflow-y-auto">
            <h1 className="font-bold text-3xl text-center mb-5">Your Todos</h1>
            {isLoading ? <Skeleton className="w-[250px] h-[200px] rounded-md p-5 space-y-6" /> : <div>
                <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
                    <AddTodoForm
                        onSubmit={addTodo}
                    />
                    <TodoList
                        todos={todos}
                        onCompletedChange={setTodoCompleted}
                        onDelete={deleteTodo}
                    />
                </div>
                <TodoSummary
                    todos={todos}
                    deleteAllCompleted={deleteAllCompletedTodos}
                />
            </div>}
        </div>
    )
};
