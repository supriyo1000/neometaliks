const initialState = {
    students: [],
    dashboardmodal: false,
    mdmodal:false
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STUDENT':
            return {
                ...state,
                students: action.payload,
            };
        case 'SET_DASHBOARD_MODAL':
            return {
                ...state,
                dashboardmodal: action.payload,
            };
        case 'SET_MD_MODAL':
            return {
                ...state,
                mdmodal: action.payload,
            };
        default:
            return state;
    }
};

export default dashboardReducer;