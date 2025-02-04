'use client';
import { Component, ErrorInfo, ReactNode } from 'react';
import { reportErrorToDiscord } from '@/utils/webhook';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    reportErrorToDiscord(error, {
      errorInfo,
      location: window.location.href,
      userAgent: navigator.userAgent,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-purple-400">Oops, something went wrong!</h2>
            <p className="text-gray-400">Don't worry, it's not you - it's me. Let's try refreshing?</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg 
                       border border-purple-500/30 transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 