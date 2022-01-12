import { Box } from '@mui/material';
import { MainFooter } from './footer';
import { MainHeader } from './header';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <MainHeader />
      <Box component='main'>{children}</Box>
      <MainFooter />
    </>
  );
};
