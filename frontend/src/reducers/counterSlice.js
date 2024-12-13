import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux';
import { setColor } from '../actions/mentorActions';


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        fetchstatus: (state, action) => {
            // Update the state with the fetched color
            state.color = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, fetchstatus } = counterSlice.actions

export default counterSlice.reducer