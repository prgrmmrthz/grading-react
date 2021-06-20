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
