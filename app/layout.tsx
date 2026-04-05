import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollButton } from "@/components/ScrollButton";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const siteUrl = "https://hyxiao.io";

export const metadata: Metadata = {
  title: {
    default: "Sean's Blog",
    template: "%s | Sean's Blog",
  },
  description: "Sean's personal blog about software engineering and AI.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "Sean's Blog",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main className="site-container" style={{ flex: 1, paddingTop: 64, paddingBottom: 64 }}>
              {children}
            </main>
            <Footer />
            <ScrollButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
