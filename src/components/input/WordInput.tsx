import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface WordInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const WordInput = ({ value, onChange, onAdd }: WordInputProps) => (
  <div className="bg-white shadow-sm p-4">
    <div className="max-w-4xl mx-auto flex gap-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add new word or sentence"
        className="flex-1"
      />
      <Button onClick={onAdd}>Add</Button>
    </div>
  </div>
);
