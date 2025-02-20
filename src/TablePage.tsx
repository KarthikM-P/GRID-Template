import { useState, useMemo } from "react";
import { getCoreRowModel, createColumnHelper, useReactTable, getFilteredRowModel } from "@tanstack/react-table";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TableTemplate } from "./Templates/TableTemplate";
import datas from "../db.json";
import "./index.css";
import { TableHeader } from "./Organisms/TableHeader";

const columnHelper = createColumnHelper();

export const TablePage = () => {
    const allKeys = [...new Set(datas.flatMap((item) => Object.keys(item)))];
    const [searchdata, setSearchdata] = useState("");
    const [cell, setCell] = useState({ rowIndex: null, columnId: null });
    const [data, setData] = useState(datas.map((item, index) => ({ ...item, id: index.toString() })));
    const [columnOrder, setColumnOrder] = useState(allKeys);
    const [pinnedColumns, setPinnedColumns] = useState({ left: [], right: [] });
    const [openDropdownId, setOpenDropdownId] = useState();

    const columns = useMemo(
        () =>
            columnOrder.map((key) =>
                columnHelper.accessor(key, {
                    id: key,
                    header: () => (
                        <TableHeader
                            id={key}
                            label={key}
                            isOpen={openDropdownId === key}
                            onToggleDropdown={() => setOpenDropdownId((prev) => (prev === key ? null : key))}
                            onPinLeft={() => pinColumn(key, "left")}
                            onPinRight={() => pinColumn(key, "right")}
                            onUnpin={() => pinColumn(key, "none")}
                        />
                    ),
                    cell: ({ getValue, row }) => {
                        const isEditing = cell.rowIndex === row.index && cell.columnId === key;
                        return isEditing ? (
                            <input
                                type="text"
                                value={getValue()}
                                onChange={(e) => handleEdit(row.index, key, e.target.value)}
                                onBlur={() => setCell({ rowIndex: null, columnId: null })}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => setCell({ rowIndex: row.index, columnId: key })}>
                                {getValue()}
                            </span>
                        );
                    },
                })
            ),
        [columnOrder, cell, data, openDropdownId]
    );

    const handleEdit = (rowIndex, columnId, newValue) => {
        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: newValue };
            return updatedData;
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

    
        
        const oldColIndex = columnOrder.findIndex((col) => col === active.id);
        const newColIndex = columnOrder.findIndex((col) => col === over.id);
    
        if (oldColIndex !== -1 && newColIndex !== -1) {
            setColumnOrder(arrayMove(columnOrder, oldColIndex, newColIndex));
        }
    };

    const handleRowReorder = (oldIndex, newIndex) => {
        setData((prevData) => {
            const updatedData = [...prevData];
            const [movedRow] = updatedData.splice(oldIndex, 1); 
            updatedData.splice(newIndex, 0, movedRow); 
            return updatedData;
        });
    };

    const pinColumn = (columnId, position) => {
        setPinnedColumns((prev) => {
            const newPinned = { left: [...prev.left], right: [...prev.right] };
            newPinned.left = newPinned.left.filter((col) => col !== columnId);
            newPinned.right = newPinned.right.filter((col) => col !== columnId);
            if (position === "left") {
                newPinned.left.push(columnId);
            } else if (position === "right") {
                newPinned.right.push(columnId);
            }
            return newPinned;
        });
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: searchdata,
            columnPinning: pinnedColumns,
        },
        onGlobalFilterChange: setSearchdata,
    });

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columnOrder}>
                <TableTemplate
                    table={table}
                    searchdata={searchdata}
                    onSearchChange={(e) => setSearchdata(e.target.value)}
                    onEdit={(cell) => setCell({ rowIndex: cell.row.index, columnId: cell.column.id })}
                    onRowReorder={handleRowReorder}
                />
            </SortableContext>
        </DndContext>
    );
};