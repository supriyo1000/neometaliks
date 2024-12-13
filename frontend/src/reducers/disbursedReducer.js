const initialState = {
    disbursedmodal: false,
    studentdetails: {},
};

const disbursedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHOW_DISBURSED_MODAL':
            return {
                ...state,
                disbursedmodal: action.payload,
            };
        case 'SET_STUDENT_DETAILS':
            return {
                ...state,
                studentdetails: action.payload,
            };
    
        default:
            return state;
    }
};

export default disbursedReducer;