import Sidebar from "@/components/nav/Sidebar";
import MobileNav from "@/components/nav/MobileNav";
import TodayTodos from "@/components/todos/TodayTodos";

const TodayPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8 xl:px-40">
          <TodayTodos />
        </main>
      </div>
    </div>
  );
};

export default TodayPage;
