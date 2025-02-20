import { Button } from "../Atoms/Button";
import { DropdownMenu } from "../Molecules/DropdownMenu";
import DraggableColumnHeader from "../DraggableColumnHeader";

type TableHeaderProps = {
    id: string;
    label: string;
    isOpen: boolean;
    onToggleDropdown: () => void;
    onPinLeft: () => void;
    onPinRight: () => void;
    onUnpin: () => void;
};

export const TableHeader = ({ id, label, isOpen, onToggleDropdown, onPinLeft, onPinRight, onUnpin }: TableHeaderProps) => (
    <div className="header-container">
        <DraggableColumnHeader id={id} label={label} />
        <div className="header-actions">
            <Button className="dots-button" onClick={onToggleDropdown}>
                ⋮
            </Button>
            {isOpen && (
                <DropdownMenu
                    onPinLeft={onPinLeft}
                    onPinRight={onPinRight}
                    onUnpin={onUnpin}
                />
            )}
        </div>
    </div>
);