/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Row } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

type TableRowProps = {
    row: Row<any>;
    onEdit: (cell: any) => void;
};

export const TableRow = ({ row, onEdit }: TableRowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: row.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr ref={setNodeRef} style={style}>
            {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} onClick={() => onEdit(cell)}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 6px", alignItems: "center" }}>
                        {index === 1 && (
                            <span {...attributes} {...listeners} style={{ cursor: "grab", textAlign: "center", width: "40px" }}>
                                <GripVertical size={20} />
                            </span>
                        )}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                </td>
            ))}
        </tr>
    );
};