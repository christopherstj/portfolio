import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme";

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
  title: "CSJ.dev | Chris St Jean - AI-Empowered Software Engineer",
  description:
    "Portfolio of Chris St Jean - AI-empowered software engineer, elite ultrarunner, and builder. Based in Santa Barbara, CA.",
  keywords: [
    "software engineer",
    "freelance developer",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
    "ultrarunning",
    "Santa Barbara",
  ],
  authors: [{ name: "Chris St Jean" }],
  icons: {
    icon: [
      { url: "/favicon-dark.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon-dark.svg",
  },
  openGraph: {
    title: "CSJ.dev | Chris St Jean - AI-Empowered Software Engineer",
    description:
      "AI-empowered software engineer, elite ultrarunner, and builder.",
    type: "website",
    locale: "en_US",
    url: "https://csj.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSJ.dev | Chris St Jean - AI-Empowered Software Engineer",
    description:
      "AI-empowered software engineer, elite ultrarunner, and builder.",
  },
  metadataBase: new URL("https://csj.dev"),
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
          <div className="noise-overlay" />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
