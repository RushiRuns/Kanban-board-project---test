import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProjectDialog({ open, onOpenChange, onCreate }) {
  const [projectName, setProjectName] = useState("");
  const isInvalid = !projectName;

  const handleCreate = () => {
    onCreate(projectName);
    setProjectName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#202020] text-white">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new project to start organizing your tasks.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3 bg-[#202020] text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreate}
            className="bg-blue-600 text-white font-bold"
            disabled={isInvalid}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
