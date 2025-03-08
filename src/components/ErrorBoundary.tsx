'use client';
import React from 'react';
import { reportErrorToDiscord } from '@/utils/errorReporting';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only report in production
    if (process.env.NODE_ENV === 'production') {
      reportErrorToDiscord(error, errorInfo).catch(console.error);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    // Use replace instead of reload to prevent adding to browser history
    window.location.replace(window.location.href);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-6 text-gray-300">
              {process.env.NODE_ENV === 'development' 
                ? this.state.error?.message || 'An error occurred'
                : 'The error has been reported and we\'ll look into it.'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 