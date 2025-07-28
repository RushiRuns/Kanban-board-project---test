import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function TaskDescription({ value, onChange }) {
  const [textCounter, setTextCounter] = useState(value.slice(0, 50));

  useEffect(() => {
    setTextCounter(value.slice(0, 50));
  }, [value]);

  function handleTextChange(e) {
    const textInput = e.target.value;
    if (textInput.length <= 50) {
      setTextCounter(textInput);
      onChange(textInput);
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Label className="opacity-75 text-sm font-medium">Task Description</Label>
      <Textarea
        value={textCounter}
        onChange={handleTextChange}
        placeholder="Give a description of the task"
        className="resize-none"
      />

      <div className="flex justify-between items-center">
        <p className="text-[12px] text-gray-500">
          {textCounter.length}/50 characters
        </p>
      </div>
    </div>
  );
}

