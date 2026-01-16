import axios from "axios";
import { ApiUser, Address } from "./types";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface UserTodos {
  id: number;
  name: string;
  address: Address | null;
  phone: string;
  todos: Todo[];
}

export async function getTodosByUserId(
  id: number
): Promise<UserTodos | "Invalid id"> {
  try {
    const [usersRes, todosRes] = await Promise.all([
      axios.get<ApiUser[]>("https://jsonplaceholder.typicode.com/users"),
      axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos"),
    ]);

    const user = usersRes.data.find((u) => u.id === id);
    if (!user) {
      return "Invalid id";
    }

    const todos = todosRes.data.filter((t) => t.userId === id);

    return {
      id: user.id,
      name: user.name,
      address: user.address ?? null,
      phone: user.phone,
      todos,
    };
  } catch {
    return "Invalid id";
  }
}
