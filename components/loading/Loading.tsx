import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  title?: string;
  description?: string;
}
const Loading = ({
  title = "Loading Your Tasks",
  description = "Please wait while we fetch your personalized to-do list...",
}: LoadingProps) => {
  return (
    <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-center text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;
