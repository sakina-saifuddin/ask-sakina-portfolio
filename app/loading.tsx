import { YearLoaderOverlay } from "@/components/YearLoader";

/** Shown by Next.js while any route is still loading: the same year countdown as the intro screen. */
export default function Loading() {
  return <YearLoaderOverlay show />;
}
