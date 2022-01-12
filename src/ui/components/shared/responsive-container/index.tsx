import { Theme } from '@mui/material';
import { styled } from '@mui/material';
import { SxProps } from '@mui/system';
import { PropsWithChildren } from 'react';

export const denseResponsiveSpacing = [1, 2, 3, 6, 8];
export const responsiveSpacing = [2, 4, 8, 13, 26];

const func =
  ({ spacing }: Theme, margin = false) =>
  (num: number) =>
    margin
      ? {
          marginRight: spacing(num),
          marginLeft: spacing(num),
        }
      : {
          paddingRight: spacing(num),
          paddingLeft: spacing(num),
        };

export type ResponsiveContainerProps = {
  m?: boolean;
};

export const ResponsiveContainer = styled(
  (props: PropsWithChildren<ResponsiveContainerProps>) => <div {...props} />
)(({ theme, m }) => {
  const py = func(theme);
  const my = func(theme, true);
  return m
    ? {
        [theme.breakpoints.up('xl')]: my(denseResponsiveSpacing[4]),
        [theme.breakpoints.down('xl')]: my(denseResponsiveSpacing[3]),
        [theme.breakpoints.down('lg')]: my(denseResponsiveSpacing[2]),
        [theme.breakpoints.down('md')]: my(denseResponsiveSpacing[1]),
        [theme.breakpoints.down('sm')]: my(denseResponsiveSpacing[0]),
      }
    : {
        [theme.breakpoints.up('xl')]: py(denseResponsiveSpacing[4]),
        [theme.breakpoints.down('xl')]: py(denseResponsiveSpacing[3]),
        [theme.breakpoints.down('lg')]: py(denseResponsiveSpacing[2]),
        [theme.breakpoints.down('md')]: py(denseResponsiveSpacing[1]),
        [theme.breakpoints.down('sm')]: py(denseResponsiveSpacing[0]),
      };
});

const createRS = (arr: number[]) => {
  return {
    p: {
      pl: arr,
      pr: arr,
    } as SxProps<Theme>,
    pl: {
      pl: arr,
    } as SxProps<Theme>,
    pr: {
      pr: arr,
    } as SxProps<Theme>,
    m: {
      ml: arr,
      mr: arr,
    } as SxProps<Theme>,
    ml: {
      ml: arr,
    } as SxProps<Theme>,
    mr: {
      ml: arr,
    } as SxProps<Theme>,
  };
};

export const denseResponsiveContainer = createRS(denseResponsiveSpacing);
export const responsiveContainer = createRS(responsiveSpacing);
