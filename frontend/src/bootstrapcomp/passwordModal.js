import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFirst, setSecond, setThird, setFourth, setFifth, setSixth, setViewModal, setInterviewDate } from '../actions/interviewtime';
import axios from 'axios';
import withAuth from '../withauth';
import { setResetPasswordModal } from '../actions/feesAction';
import ipAddress from '../ipconfig';

const PasswordModal = (props) => {
    const [password, setPassword] = useState("");
    // const [nameedit, setNameedit] = useState("");
    // const [phoneedit, setPhoneedit] = useState(null);
    // const [marksedit, setMarksedit] = useState(null);
    // const [gradeedit, setGradeedit] = useState("");
    // const [emailedit, setEmailedit] = useState("");
    const [interviewTime, setInterviewTime] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [userid, setUserid] = useState(null);

    const email = props.email;
    const userId = props.userid;

    console.log(interviewTime);

    const first = useSelector((state) => state.interview.first);
    // const second = useSelector((state) => state.interview.second);
    // const third = useSelector((state) => state.interview.third);
    // const fourth = useSelector((state) => state.interview.fourth);
    // const fifth = useSelector((state) => state.interview.fifth);
    // const sixth = useSelector((state) => state.interview.sixth);
    const resetPasswordModal = useSelector((state) => state.studentFees.resetpasswordmodal);

    // console.log(first, interviewdate);

    const dispatch = useDispatch()
    // const color = useSelector((state) => state.mentor.color);

    const handleCheckboxChange = (value) => {
        dispatch(setFirst(value));
    };

    // const user = props.student;
    // const colid = props.colId;
    // const stuid = props.stuId;

    // console.log(stuid);

    const date = new Date();
    const datenow = date.toISOString().slice(0, 19).replace('T', ' '); // Formats as 'YYYY-MM-DD HH:MM:SS'

    const generateTimeSlots = () => {
        const timeSlots = [];
        let startTimeHour = 8; // Start at 8:30 am

        while (startTimeHour < 20) { // Loop until 7:30 pm
            const endTimeHour = startTimeHour + 1;

            const startTimeString = `${startTimeHour.toString().padStart(2, '0')}:30`;
            const endTimeString = `${endTimeHour.toString().padStart(2, '0')}:30`;

            timeSlots.push(`${startTimeString} - ${endTimeString}`);

            startTimeHour = endTimeHour;
        }

        return timeSlots;
    };

    const handleUpdate = async () => {
        if (password === "") {
            alert("Please enter a password");
        }
        else {
            setIsLoading(true);
            const response = await axios.post(`http://${ipAddress}:8000/external/update_password`, {
                userid: userId, pass: password
            })
            setIsLoading(false);
            setPassword("");
            dispatch(setResetPasswordModal(false));
            console.log(response);
            alert("Password updated successfully!!")
        }
    }


    useEffect(() => {
        setInterviewTime(generateTimeSlots());
    }, [])

    return (
        <React.Fragment>

            <div className='overlay'>

                {isLoading && (
                    <div className="loading-container" style={{ zIndex: "1" }}>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                <div className='container modal-container' style={{ display: "flex", justifyContent: "center" }}>
                    {/* <div className='row'>
                        <div className='col-md-2'> */}
                    <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => {
                        dispatch(setResetPasswordModal(false));
                        dispatch(setFirst(0));
                        dispatch(setInterviewDate(''));

                    }}></button>
                    {/* </div>
                        <div className='col-md-6' style={{ alignSelf: "center", textAlign: "center" }}>
                            <h4 style={{ fontWeight: "bold" }}>Interview Schedule</h4>
                        </div>
                        <div className='col-md-4' style={{ alignSelf: "center", textAlign: "start" }}>
                            <label>Date : </label>
                            <input type='date' value={interviewdate} onChange={(e) => dispatch(setInterviewDate(e.target.value))} />
                        </div>
                    </div> */}


                    {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="button" class="btn btn-danger" onClick={() => {
                            dispatch(setViewModal(false));
                            dispatch(setFirst(0));
                            dispatch(setInterviewDate(''));
                        }}>Cancel</button>
                        <button type="button" class="btn btn-primary" onClick={() => dispatch(setViewModal(false))}>Okay</button>
                    </div> */}

                    {/* <div className='col-md-3' style={{
                        display: "flex",
                        justifyContent: "center"
                    }}> */}
                    <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ boxShadow: "#000000c7 0px 1px 7px 1px", border: "0", height: "100%", width: "30vw", margin: "2rem" }}>
                        <div class="MuiBox-root css-15m7mkq">
                            {/* <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => {
                            dispatch(setViewModal(false));
                            dispatch(setFirst(0));
                            dispatch(setInterviewDate(''));

                        }}></button> */}
                            <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi" style={{ fontSize: "1.2rem" }}>Update User's Password</h4>
                            <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

                            </div>
                        </div>
                        <div class="MuiBox-root css-1iu09ww">
                            <form class="MuiBox-root css-1ircn5c" role="form">

                                <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                    <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                    <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                    <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                        <div class="input__box">
                                            <span class="details">Email Address</span>
                                            <p>{email}</p>
                                        </div>
                                    </div></span>
                                </div>
                                <div class="MuiBox-root css-oh6zk8" style={{ marginTop: "24px" }}><span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76"><span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">

                                    <span class="MuiSwitch-thumb css-t1qlxe"></span>
                                    <span class="MuiTouchRipple-root css-w0pj6f"></span></span>
                                    <span class="MuiSwitch-track css-1n5b6w8"></span></span><span class="MuiTypography-root MuiTypography-button css-lr1e29"><div class="dropdown">

                                        <div class="input__box">
                                            <input type="text" placeholder="Enter New Password" required onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div></span>
                                </div>

                            </form>
                            <div class="MuiBox-root css-1id64jh" style={{ display: "flex", justifyContent: "end" }}>

                                <button type="button" class="btn btn-danger" style={{ marginRight: "1em" }} onClick={() => {
                                    dispatch(setResetPasswordModal(false));
                                    dispatch(setFirst(0));
                                    dispatch(setInterviewDate(''));
                                }}>Cancel</button>

                                <button class="btn btn-drop" type="submit" style={{

                                    fontFamily: 'Poppins'
                                }} onClick={handleUpdate} >
                                    Update
                                </button>
                            </div>

                            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button type="button" class="btn btn-danger" onClick={() => {
                                    dispatch(setViewModal(false));
                                    dispatch(setFirst(0));
                                    dispatch(setInterviewDate(''));
                                }}>Cancel</button>
                                <button type="button" class="btn btn-primary" onClick={() => dispatch(setViewModal(false))}>Okay</button>
                            </div> */}
                        </div>
                    </div>
                    {/* </div> */}

                </div>

            </div>

        </React.Fragment>
    )
}

export default PasswordModal;