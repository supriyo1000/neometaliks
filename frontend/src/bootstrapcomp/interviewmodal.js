import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {setFirst,setSecond,setThird,setFourth,setFifth,setSixth,setViewModal,setInterviewDate} from '../actions/interviewtime';
import axios from 'axios';
import withAuth from '../withauth';

const Interviewmodal = (props) => {
    // const [comments, setComments] = useState("");
    // const [nameedit, setNameedit] = useState("");
    // const [phoneedit, setPhoneedit] = useState(null);
    // const [marksedit, setMarksedit] = useState(null);
    // const [gradeedit, setGradeedit] = useState("");
    // const [emailedit, setEmailedit] = useState("");
    const [interviewTime, setInterviewTime] = useState([]);

    console.log(interviewTime);

    const first = useSelector((state) => state.interview.first);
    // const second = useSelector((state) => state.interview.second);
    // const third = useSelector((state) => state.interview.third);
    // const fourth = useSelector((state) => state.interview.fourth);
    // const fifth = useSelector((state) => state.interview.fifth);
    // const sixth = useSelector((state) => state.interview.sixth);
    const interviewdate = useSelector((state) => state.interview.interviewdate);

    console.log(first,interviewdate);

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

    // Use 'formattedDate' in your SQL query.


    // const role = localStorage.getItem('userid')
    // console.log(name, phone, grade, marks, email, comments, colid, stuid);

    // async function firstAprove() {
    //     const confirmSubmit = window.confirm("Do you want to submit?");

    //     if (confirmSubmit) {
    //         if (name === null, phone === null, grade === null, marks === null, comments === '') {
    //             return alert("Please Check the Mandatory Field");
    //         } else {
    //             const response = await axios.post("http://192.168.1.4:8000/users/firstAprove", {
    //                 dbmode: 1, colId: colid, stuId: stuid, sname: name, sphone: phone, sgrade: grade, smarks: marks, semail: email, cmnt: comments, roleid: role, comment2: "nothing", fapprove: null, sec_userid: null, fdate: datenow, finaldate: null
    //             });

    //             const response2 = await axios.post("http://192.168.1.4:8000/users/updatefirstAprove", {
    //                 stuId: stuid, name: nameedit, phone: phoneedit, grade: gradeedit, marks: marksedit, email: emailedit
    //             });

    //             // props.onSubmission();
    //             console.log(response);
    //             console.log(response2);

    //             if (response.status === 200 && response2.status === 200) {
    //                 window.alert("Submission successful!");
    //                 dispatch(setColor(true));
    //                 dispatch(setModal(false));
    //             }
    //         }

    //     } else {
    //         return null;
    //     }
    // }

    // useEffect(() => {

    // }, [name, phone, grade, marks, email])

    // const generateTimeSlots = () => {
    //     const timeSlots = [];
    //     let startTimeHour = 8; // Start at 8:30 am
    //     let startTimeMinute = 30;

    //     while (startTimeHour <= 19) { // Loop until 7:30 pm
    //         const endTimeMinute = (startTimeMinute) % 60;
    //         const endTimeHour = startTimeHour + Math.floor((startTimeMinute + 30) / 60);

    //         const startTimeString = `${startTimeHour.toString().padStart(2, '0')}:${startTimeMinute.toString().padStart(2, '0')}`;
    //         const endTimeString = `${endTimeHour.toString().padStart(2, '0')}:${endTimeMinute.toString().padStart(2, '0')}`;

    //         timeSlots.push(`${startTimeString} - ${endTimeString}`);

    //         startTimeHour = endTimeHour;
    //         startTimeMinute = endTimeMinute;
    //     }

    //     return timeSlots;
    // };

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

    // // Example usage:
    // const timeSlots = generateTimeSlots();
    // console.log(timeSlots);

    const handleKeyDown = (e) => {
        // Prevent any keypress events for manual input
        e.preventDefault();
    };


    useEffect(() => {
        setInterviewTime(generateTimeSlots());    
    },[])

    return (
        <React.Fragment>

            <div className='overlay'>

                <div className='container modal-container'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => {
                                dispatch(setViewModal(false));
                                dispatch(setFirst(0));
                                dispatch(setInterviewDate(''));

                            }}></button>
                        </div>
                        <div className='col-md-6' style={{alignSelf:"center",textAlign:"center"}}>
                            <h4 style={{fontWeight:"bold"}}>Interview Schedule</h4>
                        </div>
                        <div className='col-md-4' style={{ alignSelf: "center", textAlign: "start" }}>
                            <label>Date : </label>
                            <input type='date' placeholder='YYYY-MM-DD' pattern="\d{4}-\d{2}-\d{2}" value={interviewdate}
                                onChange={(e) => dispatch(setInterviewDate(e.target.value))}
                            onKeyDown={(e)=>handleKeyDown(e)}
                            />
                        </div>
                    </div>

                    <table class="table table-warning table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Select Time</th>
                                <th scope='col'>Check</th>


                            </tr>
                        </thead>
                        <tbody>

                            {/* {user.map((verificationItem, index) => ( */}
                            <React.Fragment>

                                {interviewTime.map((iTime, index) => {
                                    return <tr key={index}>
                                        <td className='tableheading'>{iTime}</td>
                                        <td>
                                            <div class="form-check">
                                                <input type="radio" class="form-check-input" id={`checkbox${index+1}`} name="optradio" value={index+1} checked={first === `${index+1}`} onChange={(e) => handleCheckboxChange(e.target.value)}
                                                />
                                            </div>

                                        </td>

                                    </tr>
                                })}
                                {/* <tr>
                                    <td className='tableheading'>10.00 am - 11.00 am</td>
                                    <td>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="checkbox1" name="optradio" value={1} checked={first === '1'} onChange={(e)=>handleCheckboxChange(e.target.value)}
                                            />
                                        </div>

                                    </td>

                                </tr>
                                <tr>
                                    <td className='tableheading'>11.00 am - 12.00 pm</td>

                                    <td>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="checkbox3" name="optradio" value={2} checked={first === '2'} onChange={(e) => handleCheckboxChange(e.target.value)} />
                                        </div>

                                    </td>

                                </tr>
                                <tr>
                                    <td className='tableheading'>12.00 pm - 1.00 pm</td>
                                    <td>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="checkbox5" name="optradio" value={3} checked={first === '3'} onChange={(e) => handleCheckboxChange(e.target.value)} />
                                        </div>

                                    </td>

                                </tr>
                                <tr>
                                    <td className='tableheading'>1.00 pm - 2.00 pm</td>
                                    
                                    <td>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="checkbox7" name="optradio" value={4} checked={first === '4'} onChange={(e) => handleCheckboxChange(e.target.value)} />
                                        </div>

                                    </td>

                                </tr>

                                <tr>
                                    <td className='tableheading'>2.00 pm - 3.00 pm</td>
                                    
                                    <td>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="checkbox9" name="optradio" value={5} checked={first === '5'} onChange={(e) => handleCheckboxChange(e.target.value)} />
                                        </div>

                                    </td>

                                </tr>
                                <tr>
                                    <td className='tableheading'>4.00 pm - 5.00 pm</td>
                                    
                                    <td>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="checkbox9" name="optradio" value={6} checked={first === '6'} onChange={(e) => handleCheckboxChange(e.target.value)} />
                                        </div>

                                    </td>

                                </tr> */}

                            </React.Fragment>

                        </tbody>
                    </table>
                    {/* <label className='tableheading'>Comments<span style={{ marginLeft: "10px", color: "red" }}>*</span></label>
                    <textarea type="text" style={{ height: "150px" }} placeholder='Enter your Comments' onChange={(e) => setComments(e.target.value)} /> */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="button" class="btn btn-danger" onClick={() => {
                            dispatch(setViewModal(false));
                            dispatch(setFirst(0));
                            dispatch(setInterviewDate(''));
                        }}>Cancel</button>
                        <button type="button" class="btn btn-primary" onClick={()=>dispatch(setViewModal(false))}>Okay</button>
                    </div>
                </div>

            </div>

        </React.Fragment>
    )
}

export default withAuth(Interviewmodal);