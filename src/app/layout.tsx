import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/partials/navbar";
import Footer from "@/components/partials/Footer";
import BackgroundVideo from "@/components/BackgroundVideo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "keero xd",
  description: "keero static page",
  icons: {
    icon: '/images/aru.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* Video Background */}
          <BackgroundVideo />

          <div className="min-h-screen flex flex-col w-full max-w-7xl mx-auto relative">
            <div className="flex z-20">
              <div className="flex-1 flex flex-col min-h-screen relative">
                {/* Nav */}
                <Navbar />
                {/* Content */}
                <main className="flex-1 items-center flex">
                  {children}
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
