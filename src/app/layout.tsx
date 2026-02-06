import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme";
import { StructuredData } from "@/components/seo";
import { StrikingBackground } from "@/components/effects";
import { Analytics } from "@vercel/analytics/next";

// Font configurations - Bold, modern, striking
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Chris St Jean | AI Agents, MCP Servers & Enterprise Workflows",
    template: "%s | Chris St Jean",
  },
  description:
    "I build AI agents and workflows that power multi-million dollar business decisions. Custom MCP servers, intelligent data pipelines, RAG systems, and enterprise-grade AI—shipped at startup speed.",
  keywords: [
    "AI agent developer",
    "MCP server developer",
    "custom AI agents",
    "AI workflow automation",
    "enterprise AI engineer",
    "LLM integration developer",
    "RAG pipeline developer",
    "Claude API developer",
    "AI data pipelines",
    "intelligent workflow systems",
    "full-stack AI developer",
    "AI systems engineer",
  ],
  authors: [{ name: "Chris St Jean" }],
  icons: {
    icon: [
      { url: "/favicon-dark.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon-dark.svg",
  },
  openGraph: {
    title: "Chris St Jean | AI Agents, MCP Servers & Enterprise Workflows",
    description:
      "I build AI agents and workflows that power multi-million dollar business decisions. Custom MCP servers, data pipelines, and enterprise AI systems.",
    type: "website",
    locale: "en_US",
    url: "https://csj.dev",
    siteName: "Chris St Jean",
    images: [
      {
        url: "/images/post-coco.jpg",
        width: 1200,
        height: 630,
        alt: "Chris St Jean - Enterprise AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris St Jean | AI Agents, MCP Servers & Enterprise Workflows",
    description:
      "I build AI agents and workflows that power multi-million dollar business decisions. Custom MCP servers and enterprise AI systems.",
    images: ["/images/post-coco.jpg"],
  },
  metadataBase: new URL("https://csj.dev"),
  alternates: {
    canonical: "https://csj.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data for SEO */}
        <StructuredData />
        {/* Prevent flash of wrong theme and set correct favicon */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                let resolvedTheme;
                if (theme === 'light') {
                  resolvedTheme = 'light';
                } else if (theme === 'dark') {
                  resolvedTheme = 'dark';
                } else {
                  resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.classList.add(resolvedTheme);
                
                // Set favicon based on theme
                const favicon = document.querySelector('link[rel="icon"]');
                if (favicon) {
                  favicon.href = resolvedTheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <StrikingBackground />
          <div className="noise-overlay" />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
