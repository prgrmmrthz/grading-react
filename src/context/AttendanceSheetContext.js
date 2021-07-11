import {createContext, useReducer } from "react";
import AttendanceSheetReducer from './AttendanceSheetReducer';

//Initial State
const initialState = {
    attendanceSheetData: []
};

export const AttendanceSheetContext = createContext(initialState);

export const AttendanceSheetProvider = (props) => {
    const [state, dispatch] = useReducer(AttendanceSheetReducer, initialState);

    //Actions
    function addData(data){
        dispatch({
            type: 'ADD',
            payload: data
        });
    }

    function setData(data){
        dispatch({
            type: 'SETDATA',
            payload: data
        });
    }

    function emptyData(){
        dispatch({
            type: 'EMPTY'
        });
    }

    return (
        <AttendanceSheetContext.Provider value={{
           attendanceSheetData: state.attendanceSheetData,
           addData,
           emptyData,
           setData
        }}>
            {props.children}
        </AttendanceSheetContext.Provider>
    );
}