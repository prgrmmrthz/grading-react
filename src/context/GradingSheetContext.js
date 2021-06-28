import {createContext, useReducer } from "react";
import GradingSheetReducer from './GradingSheetReducer';

//Initial State
const initialState = {
    gradingData: []
};

export const GradingSheetContext = createContext(initialState);

export const GradingSheetProvider = (props) => {
    const [state, dispatch] = useReducer(GradingSheetReducer, initialState);

    //Actions
    function addData(data){
        dispatch({
            type: 'ADD',
            payload: data
        });
    }

    function emptyData(){
        dispatch({
            type: 'EMPTY'
        });
    }

    return (
        <GradingSheetContext.Provider value={{
           gradingData: state.gradingData,
           addData,
           emptyData
        }}>
            {props.children}
        </GradingSheetContext.Provider>
    );
}