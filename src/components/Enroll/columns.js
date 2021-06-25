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
          width: 350,
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
          width: 550,
        }}
      >
        Name
      </div>
    ),
    accessor: "name",
  }
];
