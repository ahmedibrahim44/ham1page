import { describe, expect, it, vi } from "vitest";
import { isHomeSectionLink, shouldRevealAtViewport, shouldShowBackToTop, smoothScrollToHomeSection } from "./sectionNavigation";

describe("isHomeSectionLink", () => {
  it("accepts merged-home section links only on the homepage", () => {
    expect(isHomeSectionLink("/#processus", "/")).toBe(true);
    expect(isHomeSectionLink("/#services", "/")).toBe(true);
  });

  it("leaves page routes and hashes outside the homepage to normal navigation", () => {
    expect(isHomeSectionLink("/access", "/")).toBe(false);
    expect(isHomeSectionLink("/#ecosystem", "/access")).toBe(false);
  });

  it("scrolls to a section smoothly and respects reduced-motion preferences", () => {
    const scrollIntoView = vi.fn();
    const findTarget = vi.fn(() => ({ scrollIntoView }));
    expect(smoothScrollToHomeSection("/#services", "/", findTarget, false)).toBe(true);
    expect(findTarget).toHaveBeenCalledWith("#services");
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "smooth" });

    smoothScrollToHomeSection("/#services", "/", findTarget, true);
    expect(scrollIntoView).toHaveBeenLastCalledWith({ block: "start", behavior: "auto" });
  });

  it("shows the back-to-top control only after a meaningful scroll distance", () => {
    expect(shouldShowBackToTop(520, 800)).toBe(false);
    expect(shouldShowBackToTop(600, 800)).toBe(true);
  });

  it("reveals a section visible in a mobile viewport while leaving off-screen content hidden", () => {
    expect(shouldRevealAtViewport(72, 1_480, 844)).toBe(true);
    expect(shouldRevealAtViewport(920, 2_100, 844)).toBe(false);
  });
});
