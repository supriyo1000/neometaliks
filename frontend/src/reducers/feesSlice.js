const initialState = {
    feesmodal: false,
    refresh: false,
    resetpasswordmodal: false,
};

const StudentFeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FEES_MODAL':
            return {
                ...state,
                feesmodal: action.payload,
            };
        case 'SET_REFRESH':
            return {
                ...state,
                refresh: action.payload,
            };
        case 'SET_RESET_PASSWORD_MODAL':
            return {
                ...state,
                resetpasswordmodal: action.payload,
            };
        default:
            return state;
    }
};

export default StudentFeesReducer;