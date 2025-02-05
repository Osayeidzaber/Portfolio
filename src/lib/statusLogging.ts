const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

export async function logWebsiteStatus(status: 'online' | 'offline' = 'online') {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Discord webhook URL not configured');
    return;
  }

  const embed = {
    title: status === 'online' ? '🟢 Website Online' : '🔴 Website Offline',
    description: `Portfolio website is now ${status}`,
    color: status === 'online' ? 0x00FF00 : 0xFF0000,
    fields: [
      {
        name: 'Environment',
        value: process.env.NODE_ENV || 'development',
      },
      {
        name: 'URL',
        value: typeof window !== 'undefined' ? window.location.href : 'N/A',
      },
      {
        name: 'Timestamp',
        value: new Date().toLocaleString(),
      }
    ],
    timestamp: new Date().toISOString(),
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
    console.error('Failed to send status to Discord:', err);
  }
} 