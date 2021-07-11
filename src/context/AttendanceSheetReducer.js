const AttendanceSheetReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        attendanceSheetData: [...state.attendanceSheetData, action.payload],
      };
    case "EMPTY":
      return {
        ...state,
        attendanceSheetData: [],
      };
    case "SETDATA":
      return {
        ...state,
        attendanceSheetData: [...action.payload]
      };
    default:
      return state;
  }
};

export default AttendanceSheetReducer;
