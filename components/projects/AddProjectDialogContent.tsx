import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

const AddProjectDialogContent = () => {
  const form = useForm({ defaultValues: { name: "" } });
  const { toast } = useToast();
  const router = useRouter();

  const createAProject = useMutation(api.queries.projects.createAProject);

  const onSubmit = async ({ name }: any) => {
    console.log("submitted", { name });

    const projectId = await createAProject({ name });

    if (projectId !== undefined) {
      toast({
        title: "🚀 Successfully created a project!",
        duration: 3000,
      });
      form.reset({ name: "" });
      router.push(`/loggedin/projects/${projectId}`);
    }
  };
  return (
    <DialogContent className="max-w-xl lg:h-56 flex flex-col md:flex-row lg:justify-between text-right">
      <DialogHeader className="w-full">
        <DialogTitle>Add a Project</DialogTitle>
        <DialogDescription className="capitalize">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 border-2 p-6 border-gray-200 my-2 rounded-sm border-foreground/20"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Project name"
                        required
                        className="border-0 font-semibold text-lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button className="">Add</Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddProjectDialogContent;
