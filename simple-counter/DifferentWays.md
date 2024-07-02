There are several ways to implement a simple counter in React. Here are a few methods to get you started:

### 1. **Using React Functional Components with Hooks**
React hooks are a modern way to handle state in functional components.

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
```

### 2. **Using Class Components**
If you prefer the traditional class-based components, you can use state and lifecycle methods.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
```

### 3. **Using Redux for State Management**
For larger applications, you might want to use Redux for state management.

**Step 1: Install Redux and React-Redux**

```bash
npm install redux react-redux
```

**Step 2: Create Redux Store**

```jsx
// store.js
import { createStore } from 'redux';

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;
```

**Step 3: Connect React with Redux**

```jsx
// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```

**Step 4: Provide Store to React Application**

```jsx
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
```

### 4. **Using Context API**
Context API is useful for sharing state across the entire app without passing props down manually at every level.

```jsx
import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function Counter() {
  const { count, increment, decrement } = useContext(CountContext);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
}

function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}

export default App;
```

These methods cover a variety of approaches, from simple hooks and class-based components to more advanced state management with Redux and Context API. Which method would you like to explore further?