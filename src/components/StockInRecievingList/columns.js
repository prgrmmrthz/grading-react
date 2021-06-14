import { format } from "date-fns";
import { numberWithCommas } from "../../utils/format";

export const stockindatacolumn = [
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "QTY",
    accessor: "qty",
    className: "right"
  },
];

export const stockinlistcolumn = [
  {
    Header: "Ref#",
    accessor: "reference_number",
  },
  {
    Header: "Supplier",
    accessor: "supplier",
  },
  {
    Header: "QTY",
    accessor: "qty",
    Cell: ({ value }) => {
      return numberWithCommas(Number(value));
    },
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "MM/dd/yyyy");
    },
  },
  {
    Header: "Updated At",
    accessor: "updatedAt",
    Cell: ({ value }) => {
      return format(new Date(value), "MM/dd/yyyy");
    },
  },
  {
    Header: "Remarks",
    accessor: "remarks",
  },
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      return value === 1 ? "Completed" : "Cancelled";
    },
  },
];
