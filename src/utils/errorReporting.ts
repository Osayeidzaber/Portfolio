const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1347831647676010619/pWb4c7mbOqs2udLilEzFKM5y4UYPJvtc-0xE9qd6h1J5h5g7htfgsh97TjNKWMv1Exn_';

export const reportErrorToDiscord = async (error: Error, errorInfo?: React.ErrorInfo) => {
  // Don't report errors during development
  if (process.env.NODE_ENV === 'development') {
    console.error('Development error:', error);
    return;
  }

  try {
    // Get URL safely
    let currentUrl = 'Server-side error';
    try {
      currentUrl = typeof window !== 'undefined' ? window.location.href : 'Server-side error';
    } catch {
      // Fallback if window is not available
    }

    const errorMessage = {
      content: `🚨 Portfolio Error - ${process.env.NODE_ENV}`,
      embeds: [
        {
          title: 'Error Details',
          color: 0xFF0000,
          fields: [
            {
              name: 'Error Message',
              value: error.message || 'No error message available',
            },
            {
              name: 'Stack Trace',
              value: (error.stack || 'No stack trace available').slice(0, 1000),
            },
            errorInfo?.componentStack ? {
              name: 'Component Stack',
              value: errorInfo.componentStack.slice(0, 1000),
            } : null,
            {
              name: 'URL',
              value: currentUrl,
            },
            {
              name: 'Environment',
              value: process.env.NODE_ENV || 'unknown',
            },
            {
              name: 'Timestamp',
              value: new Date().toISOString(),
            },
          ].filter(Boolean),
        },
      ],
    };

    // Use AbortController to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorMessage),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
  } catch (reportingError) {
    // Don't throw additional errors, just log them
    console.error('Failed to report error to Discord:', reportingError);
  }
}; 