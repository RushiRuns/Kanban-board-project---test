import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";

const ProjectsArray = [
  {
    name: "Project 1",
    icon: MdOutlineCategory,
  },
  {
    name: "Project 2",
    icon: AiFillSafetyCertificate,
  },
];

export default function ProjectsList() {
  const [selectedProject, setSelectedProject] = useState(ProjectsArray[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterBySearchQuery = ProjectsArray.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function renderSelectedProject() {
    const Icon = selectedProject.icon;
    return (
      <div className="flex items-center gap-2 ">
        <div className="size-7 rounded-md flex items-center justify-center text-lg text-primary bg-primary/10">
          {<Icon />}
        </div>
        <span>{selectedProject.name}</span>
      </div>
    );
  }

  function renderDropDownMenuItem(projectItem) {
    return (
      <div
        className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setSelectedProject(projectItem);
          setIsOpen(false);
        }}
      >
        <div className="size-7 bg-primary/10 rounded-md flex items-center justify-center text-[15px] text-primary ">
          {<projectItem.icon />}
        </div>
        <span>{projectItem.name}</span>
        {projectItem.name === selectedProject.name && (
          <IoCheckmark className="ml-auto" />
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Label className="opacity-75 text-sm font-medium">Projects</Label>
      <div className="mt-1 w-full">
        <Button
          variant={"outline"}
          className="w-full h-11 flex justify-between items-center border glass-effect"
          onClick={() => setIsOpen(!isOpen)}
        >
          {renderSelectedProject()}
          <IoIosArrowDown />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute overflow-hidden w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 project-selection">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md px-2 py-1"
          />
          <IoMdSearch className="absolute top-[13px] left-2 text-lg text-gray-500 " />

          <div className="max-h-60 overflow-y-auto my-2">
            {filterBySearchQuery.map((projectItem, index) => (
              <div key={index} className="text-sm">
                {renderDropDownMenuItem(projectItem)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
