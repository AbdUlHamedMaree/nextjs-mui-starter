export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!;

export const gtmPageView = (url: string) => {
  window.gtag('config', GA_TRACKING_ID!, {
    page_path: url,
  });
};

export const gtmEvent = (action: string, params: any) => {
  window.gtag('event', action, params);
};
