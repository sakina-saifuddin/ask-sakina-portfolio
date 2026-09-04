import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakina Saifuddin | Software, Data & AI Portfolio",
  description: "Sakina Saifuddin's portfolio: software engineering, data, BI, automation, machine learning, projects, shipped work, and experience.",
 
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
