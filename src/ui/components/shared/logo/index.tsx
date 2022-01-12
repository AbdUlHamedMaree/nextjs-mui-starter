import { Box, BoxProps } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import Image, { ImageProps } from 'next/image';
import { memo, useMemo } from 'react';

export type LogoVariantUnion = 'icon' | 'portrait' | 'landscape';
export type LogoColorUnion = 'colorful' | 'white';

const defined = <T,>(v: T): v is Exclude<T, null | undefined> =>
  typeof v !== 'undefined' || v === null;

const variantToSize: Record<LogoVariantUnion, { w: number; h: number }> = {
  icon: {
    w: 512,
    h: 512,
  },
  portrait: {
    w: 500,
    h: 324,
  },
  landscape: {
    w: 512,
    h: 215,
  },
};

const variantToSlug: Record<LogoVariantUnion, Record<LogoColorUnion, string>> = {
  icon: {
    colorful: '/assets/logo/logo-icon.png',
    white: '',
  },
  portrait: {
    colorful: '/assets/logo/logo-portrait.png',
    white: '/assets/logo/logo-portrait-white.png',
  },
  landscape: {
    colorful: '/assets/logo/logo-landscape.png',
    white: '',
  },
};

export type LogoProps = {
  boxProps?: BoxProps;
  imageProps?: Omit<ImageProps, 'src'>;
  size?: ResponsiveStyleValue<number>;
  variant?: LogoVariantUnion;
  color?: LogoColorUnion;
};

export const Logo: React.VFC<LogoProps> = memo(function Logo({
  boxProps = {},
  imageProps = {},
  size = 1,
  variant = 'portrait',
  color = 'colorful',
}: LogoProps) {
  const src = useMemo(() => variantToSlug[variant][color], [variant, color]);
  const { width, height } = useMemo(() => {
    const { w, h } = variantToSize[variant];
    if (size instanceof Array)
      return {
        height: size.map(el => (defined(el) ? el * h : null)),
        width: size.map(el => (defined(el) ? el * w : null)),
      };
    if (typeof size === 'object')
      return {
        height: Object.fromEntries(
          Object.entries(size).map(([k, v]) => [k, defined(v) ? v * h : null])
        ),
        width: Object.fromEntries(
          Object.entries(size).map(([k, v]) => [k, defined(v) ? v * w : null])
        ),
      };
    return {
      height: h * size,
      width: w * size,
    };
  }, [size, variant]);

  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        position: 'relative',
        width,
        height,
      }}
    >
      <Image
        objectFit='contain'
        alt='Scandinavia logo'
        {...imageProps}
        src={src}
        layout='fill'
      />
    </Box>
  );
});
