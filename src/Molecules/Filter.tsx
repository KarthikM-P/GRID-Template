import { Label } from "../Atoms/Label";
import { Input } from "../Atoms/Input";

export const Filter = ({ value, onChange }) => (
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