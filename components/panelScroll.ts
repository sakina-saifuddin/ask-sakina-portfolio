// Scrolls to a `.hz-panel` by its `data-panel-id`, on both the desktop
// horizontal track (`.hz-track` scrolled via scrollLeft) and the mobile
// stacked layout (plain vertical document scroll). See HorizontalIntro's
// `.hz-track` wheel handling and the 900px breakpoint in globals.css.
const MOBILE_BREAKPOINT = "(max-width: 900px)";

export function scrollToPanel(panelId: string) {
  if (typeof window === "undefined") return false;
  const panel = document.querySelector<HTMLElement>(`[data-panel-id="${panelId}"]`);
  if (!panel) return false;

  if (window.matchMedia(MOBILE_BREAKPOINT).matches) {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  const track = panel.closest<HTMLElement>(".hz-track");
  if (track) {
    track.scrollTo({ left: panel.offsetLeft, behavior: "smooth" });
  } else {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}
