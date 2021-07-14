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
        Subject Code
      </div>
    ),
    accessor: "code",
  },
  {
    Header: () => (
      <div
        style={{
          width: 400,
        }}
      >
        Subject
      </div>
    ),
    accessor: "name",
  },
  {
    Header: () => (
      <div
        style={{
          width: 150,
        }}
      >
        Computable
      </div>
    ),
    accessor: "computable",
    Cell: ({ value }) => {
      return value? 'Yes':'No';
    }
  },
];
