import { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todos');
      console.log(response.data)
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post('http://localhost:8000/api/todos', { text: newTodo });
      console.log(response.data)
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${id}`, { completed });
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: response.data.completed } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      console.log(updatedTodos)
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, !todo.completed)}
            />
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
