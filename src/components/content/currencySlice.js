import { createSlice, createEntityAdapter} from "@reduxjs/toolkit";

const currencyAdapter = createEntityAdapter();

const initialState = currencyAdapter.getInitialState({
    currencySecond: 1,
    secondInput: '',
    firstInput: ''
});

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        currencyChanged: (state, action) => { state.currencySecond = action.payload},
        firstInputChanged: (state, action) => {state.firstInput = action.payload},
        secondInputChanged: (state, action) => {state.secondInput = action.payload}
    }
});

const { actions, reducer } = currencySlice;

export default reducer;

export const {
    currencyChanged,
    secondInputChanged,
    firstInputChanged
} = actions;