export const scrollToWindowHash = () => {
  if (typeof window !== 'undefined') {
    const hashId = window.location.hash;
    if (hashId) {
      const element = document.querySelector(hashId);
      if (element)
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 400);
    }
  }
};
