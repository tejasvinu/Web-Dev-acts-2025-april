// An Error Boundary component to catch JavaScript errors anywhere in the child component tree
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle method is invoked after an error has been thrown by a descendant component
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  // This lifecycle method is invoked after an error has been thrown by a descendant component
  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-6 max-w-md mx-auto mt-10 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <details className="whitespace-pre-wrap text-sm text-red-600 bg-red-50 p-4 rounded">
            <summary className="cursor-pointer font-medium mb-2">Show error details</summary>
            <p className="mt-2">{this.state.error && this.state.error.toString()}</p>
            <p className="mt-2 font-mono text-xs">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
