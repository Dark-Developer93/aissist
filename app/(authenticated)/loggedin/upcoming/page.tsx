import MobileNav from "@/components/nav/MobileNav";
import Sidebar from "@/components/nav/Sidebar";
import UpcomingTodos from "@/components/todos/UpcomingTodos";

export default function Home() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <UpcomingTodos />
        </main>
      </div>
    </div>
  );
}
