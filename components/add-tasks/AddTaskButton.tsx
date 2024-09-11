import React, { Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";

const AddTaskButton = ({
  onClick,
  title,
}: {
  onClick: Dispatch<SetStateAction<any>>;
  title: string;
}) => {
  return (
    <button className="pl-2 flex mt-2 flex-1" onClick={onClick}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center gap-2 justify-center">
          <Plus className="h-4 w-4 text-primary hover:bg-primary hover:rounded-xl hover:text-white" />
          <h3 className="text-base font-light tracking-tight text-foreground/70 hover:text-primary">
            {title}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default AddTaskButton;
