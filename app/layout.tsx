import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import FloatingBar from "@/components/FloatingBar";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skatersfl.netlify.app//"),
  title: {
    template: "%s | skatersfl",
    default: "skatersfl",
  },
  description:
    "A cornerstone in the skateboarding community, providing quality products and services to skaters.",
  keywords:
    "Skateboards, Wheels, Tape, and other accessories",
  alternates: {
    canonical: "/",
  },
  category: "Shopping",
  openGraph: {
    title: "skatersfl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="mx-auto max-w-7xl">
            <Header />
            {children}
            <Footer />
          </main>
          <FloatingBar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
