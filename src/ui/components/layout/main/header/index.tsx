import { Box, Typography } from '@mui/material';

export type MainHeaderProps = {};

export const MainHeader: React.VFC<MainHeaderProps> = () => {
  return (
    <Box component='header'>
      <Typography sx={{ typography: 'h5' }}>Header</Typography>
    </Box>
  );
};
