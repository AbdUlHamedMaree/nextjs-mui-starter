import { UrlObject } from 'url';

export type ResolvedUrlObject = {
  [K in keyof UrlObject]: Exclude<UrlObject[K], null>;
};

type PathnameUrlObject = Omit<ResolvedUrlObject, 'pathname'> &
  Required<Pick<ResolvedUrlObject, 'pathname'>>;

const route =
  (pathname: string) =>
  (rest: Omit<ResolvedUrlObject, 'pathname'> = {}): PathnameUrlObject => ({
    pathname,
    ...rest,
  });

export const routes = {
  index: route('/'),
};
