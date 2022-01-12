import { Box, Typography } from '@mui/material';

export type MainFooterProps = {};

export const MainFooter: React.VFC<MainFooterProps> = () => {
  return (
    <Box component='footer'>
      <Typography sx={{ typography: 'h5' }}>Footer</Typography>
    </Box>
  );
};
