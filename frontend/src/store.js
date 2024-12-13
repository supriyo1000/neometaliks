import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'
import mentorReducer from './reducers/mentorReducer'
import mentorEditReducer from './reducers/mentorEditReducer'
import dashboardReducer from './reducers/dashboardReducer';
import interviewReducer from "./reducers/interviewReducer";
import StudentFeesReducer from './reducers/feesSlice';
import disbursedReducer from './reducers/disbursedReducer';

export default configureStore({
    reducer: {
        counter: counterReducer,
        mentor: mentorReducer,
        mentorEdit: mentorEditReducer,
        dashboard: dashboardReducer,
        interview: interviewReducer,
        studentFees: StudentFeesReducer,
        disbursed: disbursedReducer
    },
})