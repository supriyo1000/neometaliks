const initialState = {
    // isEDITemail: false,
    // isEDITfname: false,
    // isEDITlname: false,
    // isEDITdate: false,
    // isEDITrole: false,
    // isEDITisCameraOn: false,
    phoneEdit: false,
    educationEdit: false,
    streamEdit: false,
    addEdit: false,
    positionEdit: false,
    // photoe: null,
    experienceEdit: false,
    lastcomEdit: false,
    genderEdit: false,
    otherEdit: false,
    // isEDITcapturedPhoto: null,
    // isEDITuserno: false,
    // isEDITalldetails: [],
};

const mentorEDITReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EDIT_EMAIL':
            return {
                ...state,
                isEDITemail: action.payload,
            };
        case 'SET_EDIT_FNAME':
            return {
                ...state,
                isEDITfname: action.payload,
            };
        case 'SET_EDIT_LNAME':
            return {
                ...state,
                isEDITlname: action.payload,
            };
        case 'SET_EDIT_DATE':
            return {
                ...state,
                isEDITdate: action.payload,
            };
        case 'SET_EDIT_ROLE':
            return {
                ...state,
                isEDITrole: action.payload,
            };
        case 'SET_EDIT_IS_CAMERA_ON':
            return {
                ...state,
                isEDITisCameraOn: action.payload,
            };
        case 'SET_EDIT_PHONE':
            return {
                ...state,
                phoneEdit: action.payload,
            };
        case 'SET_EDIT_EDUCATION':
            return {
                ...state,
                educationEdit: action.payload,
            };
        case 'SET_EDIT_STREAM':
            return {
                ...state,
                streamEdit: action.payload,
            };
        case 'SET_EDIT_ADD':
            return {
                ...state,
                addEdit: action.payload,
            };
        case 'SET_EDIT_POSITION':
            return {
                ...state,
                positionEdit: action.payload,
            };
        case 'SET_PHOTO':
            return {
                ...state,
                    photoEdit: action.payload, // Store the base64 image data here
                };
        case 'SET_EDIT_EXPERIENCE':
            return {
                ...state,
                experienceEdit: action.payload,
            };
        case 'SET_EDIT_LASTCOM':
            return {
                ...state,
                lastcomEdit: action.payload,
            };
        case 'SET_EDIT_GENDER':
            return {
                ...state,
                genderEdit: action.payload,
            };
        case 'SET_EDIT_OTHER':
            return {
                ...state,
                otherEdit: action.payload,
            };
        // case 'SET_EDIT_CAPTURED_PHOTO':
        //     return {
        //         ...state,
        //         isEDITcapturedPhoto: action.payload,
        //     };
        // case 'SET_EDIT_USERNO':
        //     return {
        //         ...state,
        //         isEDITuserno: action.payload,
        //     };
        // case 'SET_EDIT_ALL_DETAILS':
        //     return {
        //         ...state,
        //         isEDITalldetails: action.payload,
        //     };
        default:
            return state;
    }
};

export default mentorEDITReducer;