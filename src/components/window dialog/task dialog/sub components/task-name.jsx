import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TaskName({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="taskName">Task Name</Label>
      <Input
        type="text"
        id="taskName"
        placeholder="Enter task name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-gray-500 "
      />
    </div>
  );
}

