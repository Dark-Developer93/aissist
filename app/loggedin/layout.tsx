import { auth } from "@/auth";

import { Provider } from "@/components/providers/Provider";

// export const metadata: Metadata = {
//   title: "AIssist.ai",
//   description:
//     "AIssist: Your Intelligent Todo Companion. Streamline your task management with AI-powered features including smart task suggestions, seamless adding and deleting of tasks, robust authentication, and efficient search functionality. Stay organized and boost your productivity with our intuitive todo app.",
//   keywords:
//     "AIssist, todo app, task management, AI-powered, smart suggestions, productivity, authentication, search functionality, nextjs, typescript",
//   // TODO: add icons
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// };

export default async function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return <Provider session={session}>{children}</Provider>;
}
