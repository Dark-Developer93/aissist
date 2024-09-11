import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
