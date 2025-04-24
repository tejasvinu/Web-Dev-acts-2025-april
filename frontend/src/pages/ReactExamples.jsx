// React Examples page to showcase various React concepts for teaching purposes
import { useState, useRef, useEffect } from 'react';
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

// Main React Examples Page
function ReactExamples() {
  const [showDialog, setShowDialog] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">React Teaching Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Lists and Keys</h2>
            <ListExample />
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Working with Forms and Inputs</h2>
            <FormExample />
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Refs and the DOM</h2>
            <RefsExample />
          </section>
        </div>
        
        <div className="space-y-4">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Lifting State Up</h2>
            <LiftingStateUpExample />
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Error Boundaries</h2>
            <p className="mb-2 text-sm text-gray-600">
              Error Boundaries catch JavaScript errors in their child component tree and display a fallback UI.
            </p>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Composition vs Inheritance</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Containment Example</h3>
                <Card title="Card with Content">
                  <p className="text-gray-700">
                    This card uses composition to contain other elements. React recommends using composition
                    instead of inheritance to reuse code between components.
                  </p>
                </Card>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Specialization Example</h3>
                <p className="mb-3 text-sm text-gray-600">
                  ConfirmationDialog is a specialized version of Card using composition.
                </p>
                <button
                  onClick={() => setShowDialog(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Show Dialog
                </button>
                
                {showDialog && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
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
