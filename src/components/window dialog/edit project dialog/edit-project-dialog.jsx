import { useState, useEffect } from "react";
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

export default function EditProjectDialog({ open, onOpenChange, onEdit, project }) {
  const [projectName, setProjectName] = useState(project?.name || "");

  useEffect(() => {
    setProjectName(project?.name || "");
  }, [project]);

  const handleEdit = () => {
    onEdit(projectName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#202020] text-white">
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update the name of your project.
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
          <Button type="submit" onClick={handleEdit} className="bg-blue-600 text-white">
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
