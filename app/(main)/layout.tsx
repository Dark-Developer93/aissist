import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Noto_Sans_Georgian } from "next/font/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const defaultFont = Noto_Sans_Georgian({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIssist.ai",
  description:
    "AIssist: Your Intelligent Todo Companion. Streamline your task management with AI-powered features including smart task suggestions, seamless adding and deleting of tasks, robust authentication, and efficient search functionality. Stay organized and boost your productivity with our intuitive todo app.",
  keywords:
    "AIssist, todo app, task management, AI-powered, smart suggestions, productivity, authentication, search functionality, nextjs, typescript",
  // TODO: add icons
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
