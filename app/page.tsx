import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-6xl font-bold">Welcome to AIssist</h1>
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
      <Link href="/login">
        <Button variant="default">Login</Button>
      </Link>
    </main>
  );
}
