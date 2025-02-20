/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from "../Molecules/Filter";
import { Table } from "../Organisms/Table";
import { Table as ReactTable } from "@tanstack/react-table";

type TableTemplateProps = {
    table: ReactTable<any>;  
    searchdata: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEdit: (cell: any) => void;
    onRowReorder: (oldIndex: number, newIndex: number) => void;
};

export const TableTemplate = ({ table, searchdata, onSearchChange, onEdit, onRowReorder }: TableTemplateProps) => {
    return (
        <div className="table-container">
            <h1>GRID TABLE</h1>
            <Filter value={searchdata} onChange={onSearchChange} />
            <div className="table-wrapper">
                <Table table={table} onEdit={onEdit} onRowReorder={onRowReorder} />
            </div>
        </div>
    );
};
