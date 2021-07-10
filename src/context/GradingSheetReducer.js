const GradingSheetReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        gradingData: [...state.gradingData, action.payload],
      };
    case "EMPTY":
      return {
        ...state,
        gradingData: [],
      };
    case "SETDATA":
      return {
        ...state,
        gradingData: [...action.payload]
      };
    default:
      return state;
  }
};

export default GradingSheetReducer;
