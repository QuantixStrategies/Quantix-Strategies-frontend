/** Fixed nav height — matches Navigation `h-16 lg:h-20` */
export const NAV_SCROLL_OFFSET = 80;

/** Reset window scroll — use on route changes without a hash target */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

/** Scroll to a section id, offset for fixed header. Retries until DOM is ready. */
export function scrollToHash(hash: string, retries = 5): void {
  const id = hash.replace(/^#/, '');
  if (!id) {
    scrollToTop();
    return;
  }

  const attempt = (remaining: number) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'instant' });
      return;
    }
    if (remaining > 0) {
      requestAnimationFrame(() => attempt(remaining - 1));
    }
  };

  requestAnimationFrame(() => attempt(retries));
}
