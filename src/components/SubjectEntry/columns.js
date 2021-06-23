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
    accessor: "id",
    width: 5,
  },
  {
    Header: () => (
      <div
        style={{
          width: 850,
        }}
      >
        Subject
      </div>
    ),
    accessor: "name",
  }
];
