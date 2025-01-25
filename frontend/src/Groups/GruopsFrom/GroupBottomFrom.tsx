import GroupForm from "./GroupFrom";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"


const GroupBottomFrom: React.FC = () => {

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Create</Button>
      </PopoverTrigger>
      <PopoverContent>
        {<GroupForm />}
      </PopoverContent>
    </ Popover>
  );
};

export default GroupBottomFrom;
