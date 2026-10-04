import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, Montserrat } from "next/font/google";
import { IntroLoader } from "@/components/IntroLoader";
import { PageCurtain } from "@/components/PageCurtain";
import { ProjectImageTransition } from "@/components/ProjectImageTransition";
import { ClipWipeCurtain } from "@/components/ClipWipeCurtain";
import { GlobalClickSound } from "@/components/GlobalClickSound";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400"],
  style: ["normal", "italic"],
});

const bodySans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Heavy geometric sans for the project-book covers (paperback-style lettering).
const coverSans = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cover",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakina Saifuddin | Software, Data & AI Portfolio",
  description: "Sakina Saifuddin's portfolio: software engineering, data, BI, automation, machine learning, projects, shipped work, and experience.",

};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displaySerif.variable} ${bodySans.variable} ${coverSans.variable}`}>
      <body>
        {children}
        <IntroLoader />
        <PageCurtain />
        <ProjectImageTransition />
        <ClipWipeCurtain />
        <GlobalClickSound />
        <CustomCursor />
      </body>
    </html>
  );
}
