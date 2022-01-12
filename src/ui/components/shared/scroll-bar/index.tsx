import { Box } from '@mui/material';
import React, { forwardRef } from 'react';
import PerfectScrollbar, {
  ScrollBarProps as PerfectScrollbarProps,
} from 'react-perfect-scrollbar';

export type ScrollbarProps = PerfectScrollbarProps;

const isMobile =
  typeof window !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );

// eslint-disable-next-line react/display-name
export const Scrollbar = forwardRef<PerfectScrollbar, ScrollbarProps>((props, ref) =>
  isMobile ? (
    <Box ref={ref} sx={{ overflow: 'auto' }}>
      {props.children}
    </Box>
  ) : (
    <PerfectScrollbar ref={ref} {...props} />
  )
);
