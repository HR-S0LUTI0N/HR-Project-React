import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to indicate an error has occurred
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI when an error occurs
            return <h1>Something went wrong.</h1>;
        }

        // Render the wrapped components if no error occurred
        return this.props.children;
    }
}

export default ErrorBoundary;