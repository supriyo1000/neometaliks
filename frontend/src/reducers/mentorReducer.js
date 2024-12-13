const initialState = {
    email: '',
    fname: '',
    lname: '',
    date: '',
    role: '',
    isCameraOn: false,
    phone: null,
    education: '',
    stream: '',
    add: '',
    position: '',
    photo: null,
    experience: '',
    lastcom: '',
    gender: '',
    other: '',
    capturedPhoto: null,
    userno: '',
    alldetails: [],
    emailstatus:null,
    name: null,
    stat: null,
    grade: null,
    marks: null,
    color: false,
    modal: false,
    userauth: false,
    showrolemodal: false,
    focusmenu: '',
    activeitem: 0,
};

const mentorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
            };
        case 'SET_FNAME':
            return {
                ...state,
                fname: action.payload,
            };
        case 'SET_LNAME':
            return {
                ...state,
                lname: action.payload,
            };
        case 'SET_DATE':
            return {
                ...state,
                date: action.payload,
            };
        case 'SET_ROLE':
            return {
                ...state,
                role: action.payload,
            };
        case 'SET_IS_CAMERA_ON':
            return {
                ...state,
                isCameraOn: action.payload,
            };
        case 'SET_PHONE':
            return {
                ...state,
                phone: action.payload,
            };
        case 'SET_EDUCATION':
            return {
                ...state,
                education: action.payload,
            };
        case 'SET_STREAM':
            return {
                ...state,
                stream: action.payload,
            };
        case 'SET_ADD':
            return {
                ...state,
                add: action.payload,
            };
        case 'SET_POSITION':
            return {
                ...state,
                position: action.payload,
            };
        // case 'SET_PHOTO':
        //     return {
        //         ...state,
        //             photo: action.payload, // Store the base64 image data here
        //         };
        case 'SET_EXPERIENCE':
            return {
                ...state,
                experience: action.payload,
            };
        case 'SET_LASTCOM':
            return {
                ...state,
                lastcom: action.payload,
            };
        case 'SET_GENDER':
            return {
                ...state,
                gender: action.payload,
            };
        case 'SET_OTHER':
            return {
                ...state,
                other: action.payload,
            };
        case 'SET_CAPTURED_PHOTO':
            return {
                ...state,
                capturedPhoto: action.payload,
            };
        case 'SET_USERNO':
            return {
                ...state,
                userno: action.payload,
            };
        case 'SET_ALL_DETAILS':
            return {
                ...state,
                alldetails: action.payload,
            };
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload,
            };
        case 'SET_PHONE_STATUS':
            return {
                ...state,
                stat: action.payload,
            };
        case 'SET_GRADE':
            return {
                ...state,
                grade: action.payload,
            };
        case 'SET_MARKS':
            return {
                ...state,
                marks: action.payload,
            };
        case 'SET_EMAIL_STATUS':
            return {
                ...state,
                emailstatus: action.payload,
            };
        case 'SET_COLOR':
            return {
                ...state,
                color: action.payload,
            };
        case 'SET_MODAL':
            return {
                ...state,
                modal: action.payload,
            };
        case 'SET_USER_AUTH':
            return {
                ...state,
                userauth: action.payload,
            };
        case 'SET_SHOW_ROLE_MODAL':
            return {
                ...state,
                showrolemodal: action.payload,
            };
        case 'SET_FOCUS_MENU':
            return {
                ...state,
                focusmenu: action.payload,
            };
        case 'SET_ACTIVE_ITEM':
            return {
                ...state,
                activeitem: action.payload,
            };
        default:
            return state;
    }
};

export default mentorReducer;