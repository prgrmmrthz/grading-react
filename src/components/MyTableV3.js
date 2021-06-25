import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyles";

export const MyTableV3 = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    useBlockLayout,
    useSticky
  );

  return (
    <Styles>
      <div className="tableWrap">
        <div
          {...getTableProps()}
          className="table sticky"
          style={{ height: 500 }}
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()} className="body">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Styles>
  );
};
