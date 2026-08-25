export function isHomeSectionLink(href: string, pathname: string) {
  return pathname === "/" && /^\/#[-a-zA-Z0-9_]+$/.test(href);
}

export function shouldShowBackToTop(scrollY: number, viewportHeight: number) {
  return scrollY > Math.max(520, viewportHeight * .7);
}

export function shouldRevealAtViewport(top: number, bottom: number, viewportHeight: number) {
  return top < viewportHeight * .92 && bottom > 0;
}

type ScrollTarget = { scrollIntoView: (options: ScrollIntoViewOptions) => void };

export function smoothScrollToHomeSection(
  href: string,
  pathname: string,
  findTarget: (selector: string) => ScrollTarget | null,
  reducedMotion: boolean,
) {
  if (!isHomeSectionLink(href, pathname)) return false;
  const target = findTarget(href.slice(1));
  if (!target) return false;
  target.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  return true;
}
