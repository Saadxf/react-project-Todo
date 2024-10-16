import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo,
    onCompletedChange: (id: number, completed: boolean) => void
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onCompletedChange, onDelete }: TodoItemProps) {
    return (
        <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 border rounded-md p-2 border-gray-100 bg-white. hover:bg-slate-200 grow bg-white">
                <input
                    type="checkbox"
                    className="scale-125"
                    checked={todo.completed}
                    onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
                />
                <span className={todo.completed ? "line-through text-gray-400" : ""}>
                    {todo.title}
                </span>
            </label>
            <button
                onClick={() => onDelete(todo.id)}
                className=" text-red-400 font-bold"

            >
                Delete
            </button>

        </div>
    );
};