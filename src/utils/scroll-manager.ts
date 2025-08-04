class ScrollManager {
  private pendingScroll: string | null = null;
  private observer: MutationObserver | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      // Disable browser scroll restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      const originalScrollTo = window.scrollTo.bind(window);

      // Override scrollTo properly
      window.scrollTo = ((
        xOrOptions: number | ScrollToOptions,
        y?: number,
      ): void => {
        if (this.pendingScroll) {
          return;
        }

        if (typeof xOrOptions === "number" && typeof y === "number") {
          originalScrollTo(xOrOptions, y);
        } else if (typeof xOrOptions === "object") {
          originalScrollTo(xOrOptions);
        }
      }) as typeof window.scrollTo;
    }
  }

  setPendingScroll(hash: string) {
    this.pendingScroll = hash;
    this.startWatching();
  }

  private startWatching() {
    if (!this.pendingScroll || typeof window === "undefined") return;

    this.attemptScroll();

    this.observer = new MutationObserver(() => {
      this.attemptScroll();
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      this.cleanup();
    }, 2000);
  }

  private attemptScroll() {
    if (!this.pendingScroll) return;

    const target = document.getElementById(
      decodeURIComponent(this.pendingScroll),
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      this.cleanup();
    }
  }

  private cleanup() {
    this.pendingScroll = null;
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export const scrollManager = new ScrollManager();
