import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

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

  const editTask = (task) => {
    setCurrentTask(task);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setCurrentTask(null);
  };

  return (
    <div id='todo'>
      <TaskForm addTask={addTask} currentTask={currentTask} updateTask={updateTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
        editTask={editTask}
      />
    </div>
  );
}

function TaskForm({ addTask, currentTask, updateTask }) {
  const [task, setTask] = useState(currentTask ? currentTask.text : '');

  React.useEffect(() => {
    if (currentTask) {
      setTask(currentTask.text);
    } else {
      setTask('');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (currentTask) {
        updateTask({ ...currentTask, text: task });
      } else {
        addTask(task);
      }
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} id='todo-form'>
      <input
        id='todo-input'
        type="textarea"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task"
      />
      <button id='task-submit' type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

function TaskList({ tasks, deleteTask, toggleTaskCompletion, editTask }) {
  return (
    <div id='task-list'>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

function Task({ task, deleteTask, toggleTaskCompletion, editTask }) {
  return (
    <div className='task'>
      <span className='task-text' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <br />
      <hr />
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      /> Completed
      <button className='delete-task' onClick={() => editTask(task)}>Edit</button>
      <button className='delete-task' onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default App;
