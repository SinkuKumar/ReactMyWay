import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="SimpleCounter">
      <div className='container'>
        <h1 className='count'>{count}</h1>
      </div>
      <div className='container'>
        <button className='Button Increment' onClick={() => setCount(count + 1)}>+</button>
        <button className='Button Decrement' onClick={() => setCount(count - 1)}>-</button>
      </div>
    </div>
  );
}

export default App;
