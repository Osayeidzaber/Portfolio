const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const sendDiscordWebhook = async (payload: any) => {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('Discord webhook URL not found in environment variables');
    return;
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send Discord webhook:', error);
  }
};

export const reportErrorToDiscord = async (error: Error, context?: any) => {
  const payload = {
    embeds: [{
      title: '❌ Portfolio Website Error',
      description: error.message,
      color: 0xFF0000,
      fields: [
        {
          name: 'Error Stack',
          value: `\`\`\`${error.stack?.slice(0, 1000) || 'No stack trace'}\`\`\``,
        },
        {
          name: 'Context',
          value: `\`\`\`json\n${JSON.stringify(context, null, 2)}\`\`\``,
        },
        {
          name: 'Environment',
          value: process.env.NODE_ENV || 'unknown',
        },
        {
          name: 'Timestamp',
          value: new Date().toISOString(),
        }
      ],
    }]
  };

  await sendDiscordWebhook(payload);
}; 