import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-dropdown-menu";

import { IoIosArrowDown } from "react-icons/io";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { IoCheckmark } from "react-icons/io5";
import { useState } from "react";

const PriorityListArray = [
  {
    name: "Low",
    icon: RiArrowDownDoubleFill,
    textColor: "text-green-700",
    backgroundColor: "bg-green-500/10",
  },
  {
    name: "Medium",
    icon: MdKeyboardDoubleArrowRight,
    textColor: "text-yellow-700",
    backgroundColor: "bg-yellow-500/10",
  },
  {
    name: "High",
    icon: MdOutlineKeyboardDoubleArrowUp,
    textColor: "text-red-700",
    backgroundColor: "bg-red-500/10",
  },
];

export default function PriorityList() {
  const [selectedPriority, setSelectedPriority] = useState(
    PriorityListArray[0]
  );

  function renderSelectedPriority() {
    return (
      <div className="flex items-center gap-2 ">
        <div
          className={`size-6 ${selectedPriority.backgroundColor} rounded-md flex items-center justify-center text-lg ${selectedPriority.textColor}`}
        >
          {<selectedPriority.icon />}
        </div>
        <span className={`${selectedPriority.textColor} `}>
          {selectedPriority.name}
        </span>
      </div>
    );
  }

  function renderDropDownMenuItem(priorityItem) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`size-6 ${priorityItem.backgroundColor} rounded-md flex items-center justify-center text-lg ${priorityItem.textColor}`}
        >
          {<priorityItem.icon />}
        </div>
        <span className={`${priorityItem.textColor}`}>{priorityItem.name}</span>
      </div>
    );
  }

  function isDropDownItemChecked(priorityItem) {
    return (
      <>{priorityItem.name === selectedPriority.name && <IoCheckmark />}</>
    );
  }

  return (
    <div className="">
      <Label className="opacity-75 text-sm font-medium">Priority</Label>
      <div className="mt-2 w-full ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="priority-dropdown"
              variant={"outline"}
              className="w-full h-11 flex justify-between glass-effect"
            >
              {renderSelectedPriority()}
              <IoIosArrowDown className="text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] poppins"
          >
            {PriorityListArray.map((priorityItem, index) => (
              <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={() => setSelectedPriority(priorityItem)}
                key={index}
              >
                {renderDropDownMenuItem(priorityItem)}
                {isDropDownItemChecked(priorityItem)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
