export const columns = [
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
    accessor: 'name',
    sticky: 'left'
  },
  {
    Header: 'Learning Modality',
    accessor: 'learningmodality',
  },
  {
    Header: 'Maka-Diyos',
    accessor: 'makadiyos',
  },
  {
    Header: 'Makatao',
    accessor: 'makatao',
  },
  {
    Header: 'Maka-kalikasan',
    accessor: 'makakalikasan',
  },
  {
    Header: 'Makabansa',
    accessor: 'makabansa',
  }
];