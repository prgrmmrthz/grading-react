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
        Code
      </div>
    ),
    accessor: "code",
  },
  {
    Header: () => (
      <div
        style={{
          width: 450,
        }}
      >
        Subject
      </div>
    ),
    accessor: "subject",
  }
];
