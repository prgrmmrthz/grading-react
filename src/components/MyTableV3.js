import { useEffect, useState } from 'react';
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyles";

const EditableCell = ({
  value: initialValue,
  row: {index, original},
  column: {id},
  updateMyData
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  }

  const onBlur = () => {
    updateMyData(index, id, value, original)
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])

  if(id === 'name'){
    return <span>{value}</span>
  }else{
    return <input value={value} onChange={onChange} onBlur={onBlur} style={{width: "80px"}} />
  }
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
    rows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      initialState: { hiddenColumns: ['studid'] },
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
