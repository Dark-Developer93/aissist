import MobileNav from "@/components/nav/MobileNav";
import Sidebar from "@/components/nav/Sidebar";
import ProjectList from "@/components/projects/ProjectList";

export default function Projects() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <ProjectList />
        </main>
      </div>
    </div>
  );
}
