import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "@/types/todo";

export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);


  const retrivedTodos = async () => {
    try {
      const response = await axios.get("/todos");
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  useEffect(() => {
    const getAllTodos = async () => {
      const allTodos: Todo[] = await retrivedTodos();
      console.log(allTodos)
    };
    getAllTodos();
  }, []);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        title,
        completed: false,
      },
      ...prevTodos,
    ]);
  }

  function deletTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function deleteAllCompletedTodos() {
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
