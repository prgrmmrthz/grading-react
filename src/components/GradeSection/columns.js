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
          width: 300,
        }}
      >
        Grade
      </div>
    ),
    accessor: "grade",
  },
  {
    Header: () => (
      <div
        style={{
          width: 300,
        }}
      >
        Section
      </div>
    ),
    accessor: "section",
  },
];
