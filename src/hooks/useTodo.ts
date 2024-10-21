import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import http from "@/components/http/http";

export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const retrivedTodos = async () => {
    try {
      const response = await http.get<Todo[]>("/todos");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      
    }
  };

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const allTodos = await retrivedTodos();

        if (allTodos) {
          setTodos(allTodos);
        }
      } catch (error) {
        console.error("Failed to retrieve todos:", error);
      }
    };

    getAllTodos();
  }, []);

  async function setTodoCompleted(todo: Todo, completed: boolean) {

    const response = await http.put(`/todos/${todo.id}`, {...todo, completed });
    setTodos((todos) =>
      todos.map((td) =>
        todo.id === td.id ? { ...td, completed: response.data.completed } : td
      )
    );
  }

  const addTodo = async (title: string) => {
    const request = {
      id: String(Date.now()),
      title,
      completed: false,
    };
    const response = await http.post("/todos", request);

    setTodos([...todos, response.data]);
  };

  async function deletTodo(id: string) {
    const b = id.toString()
    await http.delete(`/todos/${b}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

  }

  async function deleteAllCompletedTodos() {
    const completedTodos = todos.filter((todo) => todo.completed);
    await Promise.all(
      completedTodos.map((todo) => http.delete(`/todos/${todo.id}`))
    );
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return {
    todos,
    addTodo,
    setTodoCompleted,
    deletTodo,
    deleteAllCompletedTodos,
  };
}
