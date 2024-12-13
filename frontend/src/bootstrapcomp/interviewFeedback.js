import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ipAddress from '../ipconfig';

import { setFunctionCall, setInterviewFeedbackModal } from '../actions/interviewtime';
import axios from 'axios';
// import withAuth from '../withauth';

const InterviewFeedback = (props) => {
    // const [intdate, setIntdate] = useState("");
    const [sub, setSub] = useState(0);
    const [com, setCom] = useState(0);
    const [convic, setConvic] = useState(0);
    const [asp, setAsp] = useState(0);
    const [elg, setElg] = useState(0);
    const [rem, setRem] = useState(null);
    const [cmnt, setCmnt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [totalnum, setTotalnum] = useState(null);

    const functioncall = useSelector((state) => state.interview.functioncall);

    const stuId = props.data.studentId;
    const intvwId = props.data.interviewerId;
    const studentname = props.data.studentname;
    const collegename = props.data.collegename;
    const subjects = props.data.subjects;
    const interviewers_role = props.data.intRoles;

    // for (const i in interviewers_role) {
    //     console.log(i,typeof(i));
    // }

    console.log(interviewers_role, typeof (interviewers_role));

    const dispatch = useDispatch()

    const totalnumber = () => {
        // Parse input values to floats (or use 0 if empty)
        const subValue = sub === "" ? 0 : parseFloat(sub);
        const comValue = com === "" ? 0 : parseFloat(com);
        const convicValue = convic === "" ? 0 : parseFloat(convic);
        const aspValue = asp === "" ? 0 : parseFloat(asp);
        const elgValue = elg === "" ? 0 : parseFloat(elg);

        // Calculate the total
        return subValue + comValue + convicValue + aspValue + elgValue;
    }

    const total = totalnumber().toFixed(2)

    console.log(sub, com, convic, asp, elg, rem, cmnt, typeof (rem));

    const handleInputChange = (value, setter, maxvalue) => {
        console.log(value);
        console.log(typeof (value));
        const numericValue = parseFloat(value);
        if (value === "") {
            setter(""); // Set the state to an empty string
            return; // Exit the function to prevent further processing
        }
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxvalue) {
            setter(numericValue);
        }
    };

    const date = new Date();
    const datenow = date.toISOString().slice(0, 19).replace('T', ' '); // Formats as 'YYYY-MM-DD HH:MM:SS'

    const submitFeedback = async () => {
        if (sub === '') {
            alert("please enter a value in Subject Knowledge");
        }
        else if (com === '') {
            alert("please enter a value in Communication");
        }
        else if (convic === '') {
            alert("please enter a value in Conviction");
        }
        else if (asp === '') {
            alert("please enter a value in Aspiration");
        }
        else if (elg === '') {
            alert("please enter a value in Eligibility");
        }
        else if (rem === null) {
            alert("please enter Remarks");
        }
        else if (cmnt === '') {
            alert("please enter a Comment");
        } else if (totalnumber === '') {
            alert("iNVALID Total");
        }
        else {
            setIsLoading(true);
            const response = await axios.post(`http://${ipAddress}:8000/users/submitFeedback`, {
                stuId, intvwId, sub, com, convic, asp, elg, total, rem, cmnt, interviewers_role
            });
            setIsLoading(false);
            alert("Feedback Submitted Successfully");
            dispatch(setFunctionCall(!functioncall));
            dispatch(setInterviewFeedbackModal(false));
            // dispatch(setFunctionCall(false));
        }
    }
    return (
        <React.Fragment>
            <div className='overlay'>
                {isLoading && (
                    <div className="loading-container">
                        <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                    </div>
                )}
                <div className='container modal-container' style={{ maxWidth: "70%", marginLeft: "20%" }}>
                    <div className='row'>
                        <div className='col-md-2'>
                            <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} disabled={isLoading} onClick={() => {
                                dispatch(setInterviewFeedbackModal(false));
                            }}></button>
                        </div>
                        <div className='col-md-6' style={{ alignSelf: "center", textAlign: "center" }}>
                            <h4 style={{ fontWeight: "bold" }}>Interview Feedback</h4>
                        </div>
                    </div><hr />

                    <div className='row'>
                        <div className='col-4' style={{ fontWeight: "bold" }}>Student : </div>
                        <div className='col-4' style={{ fontWeight: "bold" }}>Institution : </div>
                        <div className='col-4' style={{ fontWeight: "bold" }}>Stream : </div>

                        <div className='col-4'>{studentname}</div>
                        <div className='col-4'>{collegename}</div>
                        <div className='col-4'>{subjects}</div><hr />
                    </div>

                    <table class="table table-striped table-hover table-warning">
                        <thead>
                            <tr className='feedback_table_head'>
                                <th scope="col">SUBJECT KNOWLEDGE (10)<span style={{ marginLeft: "10px", color: "red" }}>*</span></th>
                                <th scope="col">COMMUNICATION (5)<span style={{ marginLeft: "10px", color: "red" }}>*</span></th>
                                <th scope="col">CONVICTION (10)<span style={{ marginLeft: "10px", color: "red" }}>*</span></th>
                                <th scope="col">ASPIRATION (10)<span style={{ marginLeft: "10px", color: "red" }}>*</span></th>
                                <th scope="col">ELIGIBILITY (15)<span style={{ marginLeft: "10px", color: "red" }}>*</span></th>
                                <th scope="col">TOTAL = 50 </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input
                                    type='number'
                                    value={sub}
                                    style={{
                                        width: "100%", padding: '0 20px'
                                    }}

                                    onChange={(e) => {
                                        handleInputChange(e.target.value, setSub, 10)
                                    }
                                    } /></td>
                                <td><input
                                    type='number'
                                    style={{ width: "100%", padding: '0 20px' }}
                                    max={10}
                                    value={com}
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, setCom, 5)
                                    }
                                    }
                                /></td>
                                <td><input
                                    type='number'
                                    value={convic}
                                    style={{ width: "100%", padding: '0 20px' }}
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, setConvic, 10)
                                    }
                                    } /></td>
                                <td>
                                    <input
                                        type='number'
                                        value={asp}
                                        style={{ width: "100%", padding: '0 20px' }}
                                        onChange={(e) => {
                                            handleInputChange(e.target.value, setAsp, 10)
                                        }
                                        }
                                    /></td>
                                <td><input
                                    type='number'
                                    value={elg}
                                    style={{ width: "100%", padding: '0 20px' }}
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, setElg, 15)
                                    }
                                    } /></td>
                                <td><div class="input__box" style={{
                                    width: "100%",
                                    background: 'white',
                                    border: '0.5px solid #7e7878',
                                    padding: '0 20px',
                                    borderRadius: '6px'
                                }}>
                                    {total}
                                </div></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='container'>
                        <p style={{ fontWeight: "bold" }}>REMARKS<span style={{ marginLeft: "10px", color: "red" }}>*</span></p>
                    </div>
                    <div className='row'>
                        <div className='col-4'><div class="form-check">
                            <input class="form-check-input" value={1} type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={(e) => setRem(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Selected
                            </label>
                        </div></div>
                        <div className='col-4'><div class="form-check">
                            <input class="form-check-input" value={10} type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => setRem(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Rejected
                            </label>
                        </div></div>
                        <div className='col-4'><div class="form-check">
                            <input class="form-check-input" value={11} type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={(e) => setRem(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault3">
                                Not Appeared
                            </label>
                        </div></div>
                    </div><hr />

                    <label>Comments<span style={{ marginLeft: "10px", color: "red" }}>*</span></label>
                    <textarea type="text" style={{ height: "100px" }} placeholder='Enter your Comments' onChange={(e) => setCmnt(e.target.value)} />

                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button type="button" style={{ margin: '10px 20px' }} class="btn btn-primary" disabled={isLoading} onClick={submitFeedback}>Submit</button>
                        <button type="button" style={{ margin: '10px 20px' }} class="btn btn-danger" disabled={isLoading} onClick={() => {
                            dispatch(setInterviewFeedbackModal(false));
                        }}>Cancel</button>

                    </div>
                </div>

            </div>

        </React.Fragment>
    )
}

export default InterviewFeedback;