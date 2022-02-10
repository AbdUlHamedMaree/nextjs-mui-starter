import { Theme } from '@mui/material/styles';
import { Options } from '@mui/material';

declare module '@mui/material/useMediaQuery' {
  export default function useMediaQuery<TTheme = Theme>(
    queryInput: string | ((theme: TTheme) => string),
    options?: Options
  ): boolean;
}

declare module 'next' {
  export type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    layout?: React.ComponentType;
    auth?: AuthGuardProps;
  };
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    query?: Record<string, string | number | boolean | undefined | null>;
  }
}

declare module 'next-auth' {
  interface Session {
    user: any;
    accessToken: string;
  }
}
