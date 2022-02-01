declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';

    PROTOCOL: string;
    DOMAIN: string;
    PORT: string;
    NEXT_PUBLIC_SITE_URL: string;

    NEXT_PUBLIC_GA_ID: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
