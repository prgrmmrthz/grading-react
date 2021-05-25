import React from "react";
import { Table, Button } from "react-bootstrap";

export default function MyTable({ header, data, handleOnEdit, handleOnDelete, handleSort, showDelete }) {
  return (
    <div>
      <Table
        striped
        bordered
        hover
        size="sm"
        responsive="sm"
      >
        <thead fixed>
          <tr>
            {header.map((h) => (
              <th onClick={()=>handleSort()}>{h}</th>
            ))}
            {showDelete && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              {header.map((h) => (
                <td onClick={()=>handleOnEdit(d)}>{d[h]}</td>
              ))}
              {showDelete && <td align="right">
                <Button variant="danger" onClick={()=>handleOnDelete(d)}>X</Button>
              </td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
