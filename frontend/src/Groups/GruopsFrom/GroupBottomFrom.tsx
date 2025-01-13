import GroupForm from "./GroupFrom";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const GroupBottomFrom: React.FC = () => {

  return (
    <Popover>
      <PopoverTrigger>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

        >
          Create
        </button>
      </PopoverTrigger>
      <PopoverContent>
        {<GroupForm />}
      </PopoverContent>
    </ Popover>
  );
};

export default GroupBottomFrom;
