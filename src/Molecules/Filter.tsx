import { Label } from "../Atoms/Label";
import { Input } from "../Atoms/Input";

type FilterProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Filter = ({ value, onChange }: FilterProps) => (
    <div className="filter-container">
        <Label className="filter-label">Filter:</Label>
        <Input
            value={value}
            onChange={onChange}
            placeholder="Filter by name..."
            className="filter-input"
        />
    </div>
);