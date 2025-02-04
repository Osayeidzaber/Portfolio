const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1336388333970128927/F6VOLbEvUSx3XZJHqxg0bdw5wcdCrors4ueQo_G9Xtwkmg0mIqj0ZwSIYXmxhcxtw12W';

export const reportErrorToDiscord = async (error: Error, errorInfo?: any) => {
  try {
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
            name: 'Error Info',
            value: `\`\`\`json\n${JSON.stringify(errorInfo, null, 2)}\`\`\``,
          },
          {
            name: 'Timestamp',
            value: new Date().toISOString(),
          }
        ],
      }]
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (webhookError) {
    console.error('Failed to send error to Discord:', webhookError);
  }
}; 