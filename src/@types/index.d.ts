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

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: any;
    accessToken: string;
  }
}
