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
          width: 250,
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
          width: 350,
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
          width: 250,
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
          width: 50,
        }}
      >
        Age
      </div>
    ),
    accessor: "age",
  },
  {
    Header: () => (
      <div
        style={{
          width: 100,
        }}
      >
        Sex
      </div>
    ),
    accessor: "sex",
  }
];
