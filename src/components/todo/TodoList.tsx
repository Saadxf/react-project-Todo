
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onCompletedChange: (todo: Todo, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export default function TodoList({
    todos, onCompletedChange, onDelete
}: TodoListProps) {
    const todosSorted = todos.sort((a, b) => {
        if (a.completed === b.completed) {
            return Number(b.id) - Number(a.id);
        }
        return a.completed ? 1 : -1;
    })
    return (
        <>
            <div className="space-y-2">
                {todosSorted.map(todo => (
                    <p key={todo.id} className="text-lg">
                        <TodoItem
                            todo={todo}
                            onCompletedChange={onCompletedChange}
                            onDelete={onDelete}
                        />
                    </p>
                ))}
            </div>
            {todos.length === 0 && (
                <p className="text-center text-sm text-gray-500"> No todo , Add new one</p>
            )}
        </>
    )
};
