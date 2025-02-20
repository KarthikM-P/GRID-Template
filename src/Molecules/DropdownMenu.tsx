import { Button } from "../Atoms/Button";

type DropdownMenuProps = {
    onPinLeft: () => void;
    onPinRight: () => void;
    onUnpin: () => void;
};

export const DropdownMenu = ({ onPinLeft, onPinRight, onUnpin }: DropdownMenuProps) => (
    <div className="dropdown-menu">
        <Button onClick={onPinLeft}>⬅️</Button>
        <Button onClick={onPinRight}>➡️</Button>
        <Button onClick={onUnpin}>❌</Button>
    </div>
);