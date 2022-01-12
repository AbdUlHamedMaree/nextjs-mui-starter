import { Theme } from '@mui/material/styles';
import { Options } from '@mui/material';

declare module '@mui/material/useMediaQuery' {
  export default function useMediaQuery<TTheme = Theme>(
    queryInput: string | ((theme: TTheme) => string),
    options?: Options
  ): boolean;
}
