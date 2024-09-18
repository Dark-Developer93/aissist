import { PlusIcon } from "lucide-react";

import { Dialog, DialogTrigger } from "../ui/dialog";
import AddProjectDialogContent from "./AddProjectDialogContent";

const AddProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger id="closeDialog">
        <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
      </DialogTrigger>
      <AddProjectDialogContent />
    </Dialog>
  );
};

export default AddProjectDialog;
