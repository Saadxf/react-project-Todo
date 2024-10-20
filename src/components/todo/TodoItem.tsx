import { Todo } from "@/types/todo";


interface TodoItemProps {
    todo: Todo,
    onCompletedChange: (id: number, completed: boolean) => void
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onCompletedChange, onDelete }: TodoItemProps) {
    return (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md shadow-sm">
            <label className="flex items-center gap-2 border rounded-md p-2 border-gray-200 bg-white hover:bg-gray-100 grow">
                <input
                    type="checkbox"
                    className="scale-125 text-blue-600 focus:ring-blue-500"
                    checked={todo.completed}
                    onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
                />
                <span className={todo.completed ? "line-through text-gray-400" : "text-gray-800"}>
                    {todo.title}
                </span>
            </label>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 font-bold hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Delete
            </button>
        </div>

    );
};
