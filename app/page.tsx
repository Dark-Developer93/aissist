import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to AIssist</h1>
      <div className="flex flex-row gap-5 py-5">
        <Image
          src="/AIssist logo.png"
          alt="AIssist Logo"
          // className="dark:invert"
          width={500}
          height={500}
          priority
        />
        <Image
          src="/AIssist logo.svg"
          alt="AIssist Logo"
          className="dark:invert"
          width={500}
          height={500}
          priority
        />
      </div>
      <p className="text-2xl">
        Welcome to our advanced AI-powered todo application! This innovative app
        combines traditional task management with cutting-edge artificial
        intelligence to revolutionize your productivity. Seamlessly add, delete,
        and organize your tasks while leveraging AI-driven features that
        intelligently suggest missing items and optimize your to-do list. With
        robust authentication for secure access and a powerful search
        functionality, managing your tasks has never been easier or more
        efficient. Experience the future of task management with our AI-enhanced
        todo app, designed to streamline your workflow and boost your
        productivity to new heights.
      </p>
    </main>
  );
}
