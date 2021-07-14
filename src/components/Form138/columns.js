import { format } from "date-fns";
export const gradesectioncolumn = [
  {
    Header: () => (
      <div
        style={{
          width: 50,
        }}
      >
        #
      </div>
    ),
    accessor: "index",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: () => (
      <div
        style={{
          width: 100,
        }}
      >
        LRN
      </div>
    ),
    accessor: "lrn",
  },
  {
    Header: () => (
      <div
        style={{
          width: 180,
        }}
      >
        Name
      </div>
    ),
    accessor: "name",
  },
  {
    Header: () => (
      <div
        style={{
          width: 80,
        }}
      >
        Sex
      </div>
    ),
    accessor: "sex",
  },
  {
    Header: () => (
      <div
        style={{
          width: 100,
        }}
      >
        Birthday
      </div>
    ),
    accessor: "birthday",
    Cell: ({ value }) => {
      return format(new Date(value), "MM/dd/yyyy");
    }
  },
  {
    Header: () => (
      <div
        style={{
          width: 80,
        }}
      >
        Age
      </div>
    ),
    accessor: "age",
  },
];
