declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_TOKEN: string;
      DISCORD_WEBHOOK_URL: string;
      NEXT_PUBLIC_SITE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}; 