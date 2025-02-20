

import { Filter } from "../Molecules/Filter";
import { Table } from "../Organisms/Table";

export const TableTemplate = ({ table, searchdata, onSearchChange, onEdit, onRowReorder }) => {
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



