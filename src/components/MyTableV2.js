import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Table } from "react-bootstrap";

export const MyTableV2 = ({ pcolumns, pdata, handleOnDblClick }) => {
  const columns = useMemo(() => pcolumns, [pcolumns]);
  const data = useMemo(() => pdata, [pdata]);

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <div className="tableFixHead  ">
      <Table
        striped
        bordered
        hover
        size="sm"
        responsive="sm"
        {...getTableProps}
      >
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                      {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onDoubleClick={() => handleOnDblClick(row.original)}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
