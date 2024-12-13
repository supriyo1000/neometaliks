const initialState = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
    modal: false,
    interviewdate: '',
    interviewfeedbackmodal: false,
    functioncall: false,
    showfundmodal: false,
    showcsrmdcomment: false,
    fetchdata: false

};

const interviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FIRST':
            return {
                ...state,
                first: action.payload,
            };
        case 'SET_SECOND':
            return {
                ...state,
                second: action.payload,
            };
        case 'SET_THIRD':
            return {
                ...state,
                third: action.payload,
            };
        case 'SET_FOURTH':
            return {
                ...state,
                fourth: action.payload,
            };
        case 'SET_FIFTH':
            return {
                ...state,
                fifth: action.payload,
            };
        case 'SET_SIXTH':
            return {
                ...state,
                sixth: action.payload,
            };
        case 'SET_VIEW_MODAL':
            return {
                ...state,
                modal: action.payload,
            };
        case 'SET_INTERVIEW_DATE':
            return {
                ...state,
                interviewdate: action.payload,
            };
        case 'SET_INTERVIEW_FEEDBACK_MODAL':
            return {
                ...state,
                interviewfeedbackmodal: action.payload,
            };
        case 'SET_FUNCTION_CALL':
            return {
                ...state,
                functioncall: action.payload,
            };
        case 'SET_SHOW_FUND_MODAL':
            return {
                ...state,
                showfundmodal: action.payload,
            };
        case 'SET_SHOW_CSR_MD_COMMENT':
            return {
                ...state,
                showcsrmdcomment: action.payload,
            };
        case 'SET_FETCH_DATA':
            return {
                ...state,
                fetchdata: action.payload,
            };
        default:
            return state;
    }
};

export default interviewReducer;