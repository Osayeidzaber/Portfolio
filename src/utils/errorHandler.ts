type ErrorSeverity = 'info' | 'warning' | 'error';

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCount: { [key: string]: number } = {};
  private lastErrorTime: { [key: string]: number } = {};
  private readonly throttleTime = 5000; // 5 seconds between same errors
  private readonly maxErrors = 3; // Max times to show same error

  private constructor() {}

  static getInstance() {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handle(error: Error | string, type: ErrorSeverity = 'error', context?: string) {
    const errorKey = `${context || 'general'}-${error.toString()}`;
    const now = Date.now();

    // Initialize counters if this is a new error
    if (!this.errorCount[errorKey]) {
      this.errorCount[errorKey] = 0;
      this.lastErrorTime[errorKey] = 0;
    }

    // Check if we should show this error
    if (
      this.errorCount[errorKey] < this.maxErrors && 
      now - this.lastErrorTime[errorKey] > this.throttleTime
    ) {
      this.errorCount[errorKey]++;
      this.lastErrorTime[errorKey] = now;

      // Only log to console in development
      if (process.env.NODE_ENV === 'development') {
        switch (type) {
          case 'info':
            console.info(`[${context || 'Info'}]:`, error);
            break;
          case 'warning':
            console.warn(`[${context || 'Warning'}]:`, error);
            break;
          case 'error':
            console.error(`[${context || 'Error'}]:`, error);
            break;
        }

        // If we've reached max errors for this type, show final message
        if (this.errorCount[errorKey] === this.maxErrors) {
          console.warn(
            `[${context || 'Warning'}]: Further similar errors will be suppressed`
          );
        }
      }
    }
  }

  // Reset error counts (useful for testing)
  reset() {
    this.errorCount = {};
    this.lastErrorTime = {};
  }
}

export const errorHandler = ErrorHandler.getInstance(); 