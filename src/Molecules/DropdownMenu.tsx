import { Button } from "../Atoms/Button";

export const DropdownMenu = ({ onPinLeft, onPinRight, onUnpin }) => (
    <div className="dropdown-menu">
        <Button onClick={onPinLeft}>⬅️</Button>
        <Button onClick={onPinRight}>➡️</Button>
        <Button onClick={onUnpin}>❌</Button>
    </div>
);