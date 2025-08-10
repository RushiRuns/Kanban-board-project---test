
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function TasksDropDown() {
  const menuItems = [
    { icon: <FaRegEdit />, label: "Edit Task", className: "" },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete Task",
      className: "text-red-600",
    },
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="inter">
          {menuItems.map((item, index) =>
            item.separator ? (
              <DropdownMenuSeparator key={index} />
            ) : (
              <DropdownMenuItem
                key={index}
                className={`flex items-center p-[10px] ${item.className}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
