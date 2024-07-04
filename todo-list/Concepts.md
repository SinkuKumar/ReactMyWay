# ToDo List - Concepts

To create a basic to-do list app in React, you need to understand the following fundamental concepts:

1. **React Basics**
    - JSX: Learn how to use JSX syntax to describe what the UI should look like.
    - Components: Understand how to create and use both functional and class components.
    - Props: Learn how to pass data between components using props.
    - State: Learn how to manage component state to handle dynamic data.
2. **Event Handling**
    - Understand how to handle events in React, such as button clicks and form submissions.
3. **Conditional Rendering**
    - Learn how to render different UI elements based on certain conditions (e.g., whether a task is completed or not).
4. **Lists and Keys**
    - Understand how to render lists of data in React and the importance of keys for list items.
5. **Forms**
    - Learn how to handle form inputs, including controlled components (components that derive their input values from React state).
6. **Lifting State Up**
    - Understand how to lift state up to a common ancestor to manage state shared between multiple components.

## Example To-Do List App Outline
Here's a high-level outline of a simple to-do list app with the key concepts:

**App Component**
- Manages the overall state of the to-do list (array of tasks).
- Renders the TaskList and TaskForm components.
**TaskList Component**
- Receives the list of tasks as a prop.
- Maps through the tasks and renders a Task component for each one.
**Task Component**
- Receives a single task as a prop.
- Displays the task description and a checkbox to mark it as completed.
- Has a button to delete the task.
**TaskForm Component**
- Contains an input field for adding new tasks.
- Manages its own input state and calls a function passed down via props to add a new task.

### Code Example
Here's a simple implementation:
```js
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleTaskCompletion={toggleTaskCompletion} 
      />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="New task" 
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, deleteTask, toggleTaskCompletion }) {
  return (
    <ul>
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          deleteTask={deleteTask} 
          toggleTaskCompletion={toggleTaskCompletion} 
        />
      ))}
    </ul>
  );
}

function Task({ task, deleteTask, toggleTaskCompletion }) {
  return (
    <li>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTaskCompletion(task.id)} 
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default App;
```
**Concepts in the Example**:
- **JSX**: Used to describe the UI in each component.
- **Components**: App, TaskForm, TaskList, and Task components.
- **Props**: Passing tasks and functions between components.
- **State**: Managing the list of tasks and form input state.
- **Event** Handling: Handling form submissions and button clicks.
- **Conditional** Rendering: Striking through completed tasks.
- **Lists** and Keys: Rendering the list of tasks with unique keys.

Understanding these concepts will give you a solid foundation for building more complex applications in React.