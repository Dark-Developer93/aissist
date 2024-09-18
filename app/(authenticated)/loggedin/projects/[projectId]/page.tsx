import MobileNav from "@/components/nav/MobileNav";
import Sidebar from "@/components/nav/Sidebar";
import { Id } from "@/convex/_generated/dataModel";
import ProjectTodos from "./ProjectTodos";

export default function ProjectPage({
  params,
}: {
  params: { projectId: Id<"projects"> };
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8 xl:px-40">
          <ProjectTodos projectId={params.projectId} />
        </main>
      </div>
    </div>
  );
}
