import { useEffect, useState } from 'react';
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyles";

const EditableCell = ({
  value: initialValue,
  row: {index},
  column: {id},
  updateMyData
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  }

  const onBlur = () => {
    updateMyData(index, id, value)
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell
}

export const MyTableV3 = ({ columns, data, updateMyData, skipPageReset }) => {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      initialState: { pageIndex: 2 },
      updateMyData
    },
    useBlockLayout,
    useSticky
  );

  return (
    <Styles>
      <div className="">
        <div
          {...getTableProps()}
          className="table sticky"
          style={{height: 500 }}
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