import type { Metadata } from "next";
import { Poppins, JetBrains_Mono, Fredoka } from "next/font/google";
import { CircleAlert } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Header } from "@/components/header";
import { TechBackground } from "@/components/tech-background";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "freeLLM — directory of free access to AI models",
  description:
    "A directory of free access to AI models: limits, providers, statuses. Find a model and get free access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrains.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-bg text-text">
        <TechBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Header />
          <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 md:px-6">
            {children}
          </main>
          <footer className="mx-auto w-full max-w-[1440px] px-4 py-8 text-center md:px-6">
            <p className="mx-auto flex max-w-xl items-start justify-center gap-2 text-[13px] leading-relaxed text-text-muted">
              <CircleAlert
                className="mt-0.5 size-3.5 shrink-0 text-text-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                Some websites may be out of date, and the author may not have had
                time to update them. If you notice this, please contact{" "}
                <a
                  href="https://x.com/0x_kaize"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary underline decoration-border-strong underline-offset-2 transition-colors duration-150 hover:text-text"
                >
                  kaize
                </a>
                .
              </span>
            </p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
