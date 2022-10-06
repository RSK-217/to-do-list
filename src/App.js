import { useState, useEffect } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredtodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredtodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredtodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredtodos(todos);
        break;
    }
  }
  
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Rick's To-Do List</h1>
      </header>
      <Form  
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        setInputText={setInputText} 
        setStatus={setStatus}
      />
      <TodoList 
        setTodos={setTodos} 
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
