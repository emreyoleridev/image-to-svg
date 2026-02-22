import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImageToSVG - Pixel-Perfect Image to Vector Conversion",
  description: "Convert PNG, JPG, and WEBP images into high-quality SVG vector graphics instantly and securely, entirely in your browser.",
  keywords: ["image to svg", "vectorizer", "png to svg", "jpg to svg", "client-side conversion", "pixel perfect vector"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <div className="fixed bottom-6 right-6 z-50">
            <ModeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
