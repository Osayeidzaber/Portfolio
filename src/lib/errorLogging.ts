const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

interface ErrorLog {
  message: string;
  stack?: string;
  url?: string;
  timestamp: string;
  userAgent?: string;
}

export async function logErrorToDiscord(error: Error, context?: string) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Discord webhook URL not configured');
    return;
  }

  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
  };

  const embed = {
    title: '❌ Error Occurred',
    description: `**Context:** ${context || 'Not specified'}`,
    color: 0xFF0000,
    fields: [
      {
        name: 'Error Message',
        value: `\`\`\`${errorLog.message}\`\`\``,
      },
      {
        name: 'Stack Trace',
        value: `\`\`\`${errorLog.stack?.slice(0, 1000) || 'No stack trace'}\`\`\``,
      },
      {
        name: 'URL',
        value: errorLog.url || 'N/A',
      },
      {
        name: 'User Agent',
        value: errorLog.userAgent || 'N/A',
      },
    ],
    timestamp: errorLog.timestamp,
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (err) {
    console.error('Failed to send error to Discord:', err);
  }
} 