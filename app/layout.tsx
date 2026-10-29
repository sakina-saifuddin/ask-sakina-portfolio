import type { Metadata } from "next";
import { VT323, IBM_Plex_Mono, Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";

const vt = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Sakina Saifuddin",
  description: "Sakina Saifuddin: software, data and AI. Some of it is on VHS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${vt.variable} ${mono.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
