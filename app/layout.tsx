import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakina Saifuddin | Software, Data & AI Portfolio",
  description: "Sakina Saifuddin's portfolio: software engineering, data, BI, automation, machine learning, projects, shipped work, and experience.",

};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${cinzel.variable} ${inter.variable}`}><body>{children}</body></html>;
}
