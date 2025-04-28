// React Examples page to showcase various React concepts for teaching purposes
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

// Example component that will throw an error when clicked (for Error Boundaries demo)
const BuggyCounter = () => {
  const [counter, setCounter] = useState(0);
  
  const handleClick = () => {
    setCounter(prevCounter => {
      // This will throw when counter reaches 5
      if (prevCounter === 4) {
        throw new Error('I crashed when counter reached 5!');
      }
      return prevCounter + 1;
    });
  };
  
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="mb-2">Counter: {counter}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Increment (Crashes at 5)
      </button>
    </div>
  );
};

// Example of containment through composition
const Card = ({ title, children }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="px-4 py-2 bg-gray-100 border-b">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

// Example of a specialized Dialog using composition
const ConfirmationDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <Card title={title}>
      <p className="mb-4 text-gray-700">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </Card>
  );
};

// Example of basic list component with keys
const ListExample = () => {
  const items = [
    { id: 1, text: 'Learn React fundamentals' },
    { id: 2, text: 'Build a Todo app' },
    { id: 3, text: 'Master React concepts' },
    { id: 4, text: 'Deploy the application' },
  ];
  
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg mb-2">List Example with Keys</h3>
      <ul className="list-disc pl-5 space-y-1">
        {items.map(item => (
          <li key={item.id} className="text-gray-700">{item.text}</li>
        ))} 
      </ul>
    </div>
  );
};

// Example of a controlled form component
const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`);
  };
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-2">Form Example</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Form
          </button>
        </div>
      </form>
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p className="font-medium">Form State:</p>
        <pre className="text-xs">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

// Example of using refs to access DOM elements
const RefsExample = () => {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-2">Refs Example</h3>
      <div className="flex space-x-2 items-center">
        <input
          ref={inputRef}
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Focus will move here"
        />
        <button
          onClick={focusInput}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Focus Input
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Click the button to focus the input (demonstrates useRef hook)
      </p>
    </div>
  );
};

// Example of lifting state up
const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  const handleChange = (e) => {
    onTemperatureChange(e.target.value);
  };
  
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter temperature in {scale === 'c' ? 'Celsius' : 'Fahrenheit'}:
      </label>
      <input
        type="number"
        value={temperature}
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
      />
    </div>
  );
};

// Helper functions for temperature conversion
const toCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const LiftingStateUpExample = () => {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');
  
  const handleCelsiusChange = (value) => {
    setTemperature(value);
    setScale('c');
  };
  
  const handleFahrenheitChange = (value) => {
    setTemperature(value);
    setScale('f');
  };
  
  const celsius = scale === 'f' ? toCelsius(parseFloat(temperature)) : temperature;
  const fahrenheit = scale === 'c' ? toFahrenheit(parseFloat(temperature)) : temperature;
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-2">Lifting State Up Example</h3>
      <p className="mb-3 text-sm text-gray-600">
        Enter a temperature in either Celsius or Fahrenheit, and the other will be calculated.
      </p>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
    </div>
  );
};

// Example: Class Component with State and Lifecycle Methods
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    // Runs after the component output has been rendered to the DOM
    this.timerID = setInterval(
      () => this.tick(),
      1000 // Update every second
    );
    console.log('Clock component mounted, timer started.');
  }

  componentWillUnmount() {
    // Runs just before the component is removed from the DOM
    clearInterval(this.timerID);
    console.log('Clock component unmounted, timer stopped.');
  }

  tick() {
    // Update the component's state
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h3 className="font-medium text-lg mb-2">Class Component: Clock</h3>
        <p className="text-gray-700">Current Time: {this.state.date.toLocaleTimeString()}</p>
        <p className="mt-2 text-sm text-gray-600">
          Demonstrates class component structure, state management (`this.state`, `this.setState`),
          and lifecycle methods (`componentDidMount`, `componentWillUnmount`) for setting up and cleaning up resources (like timers).
        </p>
      </div>
    );
  }
}

// Example: Conditional Rendering
const ConditionalRenderingExample = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const count = 0; // Example for rendering based on count

  return (
    <div>
      <h3 className="font-medium text-lg mb-2">Conditional Rendering</h3>
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-3"
      >
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>

      {/* Method 1: Inline If with Logical && Operator */}
      {isLoggedIn && <p className="text-green-600">Welcome back, User!</p>}

      {/* Method 2: Inline If-Else with Conditional (Ternary) Operator */}
      <p className="text-gray-700">
        Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}
      </p>

      {/* Method 3: Preventing Component from Rendering (return null) */}
      {showWarning && (
        <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800">
          This is a warning message.
          <button onClick={() => setShowWarning(false)} className="ml-2 text-xs text-yellow-900 underline">Hide</button>
        </div>
      )}
      {!showWarning && <p className="text-sm text-gray-500 mt-2">Warning hidden.</p>}

      {/* Example: Conditional rendering based on a count */}
      <div className="mt-3">
        {count > 0 && <p>You have {count} new messages.</p>}
        {count === 0 && <p>You have no new messages.</p>}
      </div>
       <p className="mt-2 text-sm text-gray-600">
          Shows different ways to render UI based on conditions: logical `&&`, ternary operator, and preventing rendering.
        </p>
    </div>
  );
};

// Example: Context API for Theme Switching
const ThemeContext = createContext('light'); // Default theme

const ThemedComponent = () => {
  const theme = useContext(ThemeContext); // Consume the context

  const styles = {
    light: { backgroundColor: '#f3f4f6', color: '#1f2937', border: '1px solid #d1d5db' },
    dark: { backgroundColor: '#374151', color: '#f9fafb', border: '1px solid #4b5563' },
  };

  return (
    <div style={styles[theme]} className="p-4 rounded mt-2 transition-colors duration-300">
      <p>This component uses the theme: <strong>{theme}</strong></p>
      <p className="text-sm">The background and text color change based on the theme provided by the Context.</p>
    </div>
  );
};

const ContextExample = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Provide the context value to children
    <ThemeContext.Provider value={theme}>
      <div>
        <h3 className="font-medium text-lg mb-2">Context API Example (Theme Switcher)</h3>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 mb-3"
        >
          Toggle Theme (Current: {theme})
        </button>
        <ThemedComponent />
         <p className="mt-2 text-sm text-gray-600">
          Demonstrates using `createContext`, `useContext`, and `Provider` to pass data (theme) down the component tree without prop drilling.
        </p>
      </div>
    </ThemeContext.Provider>
  );
};

// Example: Data Fetching with useEffect
const DataFetchingExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        const response = await new Promise(resolve =>
          setTimeout(() => resolve({ userId: 1, id: 1, title: 'Fetched Data Example', completed: false }), 1500)
        );
        // In a real app: const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        // const result = await response.json();
        setData(response); // Use mock data directly
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function

    // Cleanup function (optional) - runs on component unmount or before effect runs again
    return () => {
      console.log('DataFetchingExample cleanup: Component unmounted or effect re-running.');
      // You might cancel ongoing fetch requests here in a real app
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h3 className="font-medium text-lg mb-2">Data Fetching with useEffect</h3>
      {loading && <p className="text-blue-600">Loading data...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {data && (
        <div className="p-3 bg-gray-100 rounded">
          <p className="font-medium">Fetched Data:</p>
          <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
       <p className="mt-2 text-sm text-gray-600">
          Uses the `useEffect` hook to perform a side effect (fetching data) after the component renders. The empty dependency array `[]` ensures it runs only once on mount.
        </p>
    </div>
  );
};

// Example: Dynamic Styling
const DynamicStylingExample = () => {
  const [isActive, setIsActive] = useState(false);

  const activeStyle = {
    backgroundColor: 'lightblue',
    fontWeight: 'bold',
    border: '2px solid blue',
  };

  const inactiveStyle = {
    backgroundColor: 'lightgray',
    fontWeight: 'normal',
    border: '1px solid gray',
  };

  return (
    <div>
      <h3 className="font-medium text-lg mb-2">Dynamic Styling Example</h3>
      <button
        onClick={() => setIsActive(!isActive)}
        style={isActive ? activeStyle : inactiveStyle}
        className="p-3 rounded transition-all duration-300"
      >
        Click to Toggle Style (Active: {isActive ? 'Yes' : 'No'})
      </button>
       <p className="mt-2 text-sm text-gray-600">
          Demonstrates changing inline styles based on the component's state.
        </p>
    </div>
  );
};


// Main React Examples Page
function ReactExamples() {
  const [showDialog, setShowDialog] = useState(false);
  // State to control mounting/unmounting the Clock component for lifecycle demo
  const [showClock, setShowClock] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">React Teaching Examples</h1>

      {/* Section: Core Concepts */}
      <section className="mb-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
        <h2 className="text-xl font-semibold mb-3 text-indigo-800">Core Concepts</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-medium">React Elements & JSX</h3>
            <p className="text-sm text-gray-700">
              React uses JSX (JavaScript XML), a syntax extension allowing you to write HTML-like structures in JavaScript.
              These structures are compiled into `React.createElement()` calls, which create objects called React Elements.
              These elements describe what you want to see on the screen.
            </p>
            <pre className="text-xs bg-gray-100 p-2 rounded mt-1"><code>{`const element = <h1 className="greeting">Hello, world!</h1>;`}</code></pre>
          </div>
          <div>
            <h3 className="font-medium">Function vs. Class Components</h3>
            <p className="text-sm text-gray-700">
              React components let you split the UI into independent, reusable pieces.
              <br />- <strong>Function Components:</strong> Simpler, often preferred with Hooks (`useState`, `useEffect`). Example: `ListExample`.
              <br />- <strong>Class Components:</strong> Use ES6 classes, have lifecycle methods, manage state with `this.state`. Example: `Clock` below.
            </p>
          </div>
           <div>
            <h3 className="font-medium">Props vs. State vs. Context</h3>
            <p className="text-sm text-gray-700">
              - <strong>Props:</strong> (Properties) Read-only data passed down from parent to child components. Example: `Card` title.
              <br />- <strong>State:</strong> Data managed *within* a component that can change over time, triggering re-renders. Example: `FormExample` input values, `Clock` time.
              <br />- <strong>Context:</strong> A way to pass data through the component tree without having to pass props down manually at every level. Example: `ContextExample` theme.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Column 1 */}
        <div className="space-y-6">
          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Class Component & Lifecycle</h2>
             <button
              onClick={() => setShowClock(!showClock)}
              className="px-3 py-1 mb-3 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              {showClock ? 'Unmount Clock' : 'Mount Clock'}
            </button>
            {showClock && <Clock />} {/* Conditionally render Clock */}
             {!showClock && <p className="text-sm text-gray-500">Clock component is unmounted.</p>}
             <p className="mt-2 text-xs text-gray-500">Check the console to see mount/unmount logs.</p>
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Lists and Keys</h2>
            <ListExample />
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Working with Forms</h2>
            <FormExample />
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Refs and the DOM</h2>
            <RefsExample />
          </section>

           <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Dynamic Styling</h2>
            <DynamicStylingExample />
          </section>

        </div>

        {/* Column 2 */}
        <div className="space-y-6">
           <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Conditional Rendering</h2>
            <ConditionalRenderingExample />
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Lifting State Up</h2>
            <LiftingStateUpExample />
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Context API</h2>
            <ContextExample />
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Handling Events & Side Effects (`useEffect`)</h2>
            <DataFetchingExample />
             <p className="mt-3 text-sm text-gray-600">
              Event handling (like `onClick`, `onChange`) allows components to respond to user interactions. `useEffect` handles side effects like data fetching, subscriptions, or manual DOM manipulations after rendering.
            </p>
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Error Boundaries</h2>
            <p className="mb-2 text-sm text-gray-600">
              Error Boundaries catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
            </p>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </section>

          <section className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Composition vs Inheritance</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Containment Example</h3>
                <Card title="Generic Card Component">
                  <p className="text-gray-700">
                    This card uses `props.children` to contain arbitrary elements passed to it. This is a core composition pattern in React.
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="font-medium mb-2">Specialization Example</h3>
                <p className="mb-3 text-sm text-gray-600">
                  `ConfirmationDialog` is a specialized version of `Card`, configured via props. React favors composition over inheritance for code reuse.
                </p>
                <button
                  onClick={() => setShowDialog(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Show Confirmation Dialog
                </button>

                {showDialog && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"> {/* Added z-index */}
                    <div className="max-w-md w-full">
                      <ConfirmationDialog
                        title="Confirm Action"
                        message="Are you sure you want to perform this action?"
                        onConfirm={() => {
                          alert('Action confirmed!');
                          setShowDialog(false);
                        }}
                        onCancel={() => setShowDialog(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Thinking in React Section - unchanged */}
      <section className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-3">Thinking in React</h2>
        <ol className="list-decimal ml-5 space-y-2">
          <li className="text-gray-800">
            <span className="font-medium">Break the UI into a component hierarchy</span>
            <p className="text-sm text-gray-600">
              Single responsibility principle: a component should ideally do one thing.
            </p>
          </li>
          <li className="text-gray-800">
            <span className="font-medium">Build a static version first</span>
            <p className="text-sm text-gray-600">
              Build components that reuse other components and pass data using props.
            </p>
          </li>
          <li className="text-gray-800">
            <span className="font-medium">Identify the minimal UI state</span>
            <p className="text-sm text-gray-600">
              Figure out the absolute minimal representation of the state your UI needs.
            </p>
          </li>
          <li className="text-gray-800">
            <span className="font-medium">Identify where state should live</span>
            <p className="text-sm text-gray-600">
              Figure out which component owns each piece of state.
            </p>
          </li>
          <li className="text-gray-800">
            <span className="font-medium">Add inverse data flow</span>
            <p className="text-sm text-gray-600">
              Support data flowing from child components back up to parents.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}

export default ReactExamples;
