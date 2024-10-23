import { Todo } from "@/types/todo";
import http from "@/components/http/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useTodo() {
  const queryClient = useQueryClient();

  const getTodos = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await http.get<Todo[]>("/todos");
    return response.data;
  };

  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: Todo) => http.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: Todo }) =>
      http.put(`/todos/${id}`, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => http.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addTodo = async (title: string) => {
    const newTodo: Todo = {
      id: String(Date.now()),
      title,
      completed: false,
    };
    addTodoMutation.mutate(newTodo);
  };

  const setTodoCompleted = async (todos: Todo, completed: boolean) => {
    const todo: Todo = { ...todos, completed };
    updateTodoMutation.mutate({ id: todo.id, todo });
  };

  const deleteTodo = async (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const deleteAllCompletedTodos = async () => {
    const completedTodos = data?.filter((todo) => todo.completed) || [];
    await Promise.all(
      completedTodos.map((todo) => deleteTodoMutation.mutate(todo.id))
    );
  };

  return {
    todos: data || [],
    isLoading,
    addTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompletedTodos,
  };
}
