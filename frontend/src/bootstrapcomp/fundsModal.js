import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ipAddress from '../ipconfig';
import { setFunctionCall, setInterviewFeedbackModal, setShowFundModal } from '../actions/interviewtime';
import axios from 'axios';
// import withAuth from '../withauth';

const FundsModal = (props) => {
    const [alldata, setAlldata] = useState([]);
    const [roles, setRoles] = useState([]);
    const [sub, setSub] = useState(0);
    const [com, setCom] = useState(0);
    const [convic, setConvic] = useState(0);
    const [asp, setAsp] = useState(0);
    const [elg, setElg] = useState(0);
    const [rem, setRem] = useState(null);
    const [cmnt, setCmnt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [totalnum, setTotalnum] = useState(null);

    const stuId = props.studentId;
    const dispatch = useDispatch();
    
    async function getfeedbackData(id) {
        const response = await fetch(`http://${ipAddress}:8000/interview/get_csr_feedback_modal?studentId=${id}`).then(res => res.json());
        setAlldata(response.res1);
        setRoles(response.res2);
        console.log(response);
    }

    const remarks = (value) => {
        if (value === 1) {
            return "Approved"
        } else if (value === 0) {
            return "Rejected"
        } else {
            return "Not Appread"
        }
    }

    const allroles = (value) => {
        console.log(value);
        let addRoles = [];
        for (let role = 0; role < value.length; role++) {
            addRoles.push(' , '+ value[role].roleName);
        }
        console.log(addRoles);
        return addRoles;
    }

    // for (const i in interviewers_role) {
    //     console.log(i,typeof(i));
    // }

    // console.log(interviewers_role, typeof (interviewers_role));

    // const dispatch = useDispatch()

    // const totalnumber = () => {
    // Parse input values to floats (or use 0 if empty)
    //     const subValue = sub === "" ? 0 : parseFloat(sub);
    //     const comValue = com === "" ? 0 : parseFloat(com);
    //     const convicValue = convic === "" ? 0 : parseFloat(convic);
    //     const aspValue = asp === "" ? 0 : parseFloat(asp);
    //     const elgValue = elg === "" ? 0 : parseFloat(elg);

    //     // Calculate the total
    //     return subValue + comValue + convicValue + aspValue + elgValue;
    // }

    // const total = totalnumber().toFixed(2)

    // console.log(sub, com, convic, asp, elg, rem, cmnt, typeof (rem));

    // const handleInputChange = (value, setter, maxvalue) => {
    //     console.log(value);
    //     console.log(typeof (value));
    //     const numericValue = parseFloat(value);
    //     if (value === "") {
    //         setter(""); // Set the state to an empty string
    //         return; // Exit the function to prevent further processing
    //     }
    //     if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxvalue) {
    //         setter(numericValue);
    //     }
    // };

    // const date = new Date();
    // const datenow = date.toISOString().slice(0, 19).replace('T', ' '); // Formats as 'YYYY-MM-DD HH:MM:SS'

    // const submitFeedback = async () => {
    //     if (sub === '') {
    //         alert("please enter a value in Subject Knowledge");
    //     }
    //     else if (com === '') {
    //         alert("please enter a value in Communication");
    //     }
    //     else if (convic === '') {
    //         alert("please enter a value in Conviction");
    //     }
    //     else if (asp === '') {
    //         alert("please enter a value in Aspiration");
    //     }
    //     else if (elg === '') {
    //         alert("please enter a value in Eligibility");
    //     }
    //     else if (rem === null) {
    //         alert("please enter Remarks");
    //     }
    //     else if (cmnt === '') {
    //         alert("please enter a Comment");
    //     } else if (totalnumber === '') {
    //         alert("iNVALID Total");
    //     }
    //     else {
    //         setIsLoading(true);
    //         const response = await axios.post(`http://${ipAddress}:8000/users/submitFeedback`, {
    //             stuId, intvwId, sub, com, convic, asp, elg, total, rem, cmnt, interviewers_role
    //         });
    //         setIsLoading(false);
    //         alert("Feedback Submitted Successfully");
    //         dispatch(setFunctionCall(true));
    //         dispatch(setInterviewFeedbackModal(false));
    //         // dispatch(setFunctionCall(false));
    //     }
    // }

    useEffect(() => {
        stuId && getfeedbackData(stuId)    
    },[])

    return (
        <React.Fragment>
            <div className='overlay'>
                <div className='container modal-container' style={{maxWidth:"60%"}}>
                    <div className='row'>
                        <div className='col-md-2'>
                            <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={(e)=> dispatch(setShowFundModal(false))}
                            ></button>
                        </div>
                        <div className='col-md-6' style={{ alignSelf: "center", textAlign: "center" }}>
                            <h4 style={{ fontWeight: "bold" }}>Interview Feedbacks</h4>
                        </div>
                    </div>
                    {alldata.map((value,index) => {
                       return <div class="card recent-sales overflow-auto" style={{ height: "100%" }} key={index}>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-6'>
                                       <h5 class="card-title" style={{ padding: '10px 0 0px 0' }}>Interviewer Name || <span style={{ color: "#4154f1", fontWeight: "bold" }}>{value.firstname} {value.lastname}</span></h5>
                                    </div>
                                    <div className='col-6'>
                                       <h5 class="card-title" style={{ padding: '10px 0 0px 0' }}>Role || <span style={{ color: "#4154f1", fontWeight: "bold" }}>{value.roleName} {allroles(roles[index])}</span></h5>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-8'>
                                       <h5 class="card-title" style={{ padding: '10px 0 0px 0' }}>Comments || <span style={{ color: "#4154f1", fontWeight: "bold" }}>{value.comments}</span></h5>
                                    </div>
                                    <div className='col-4'>
                                       <h5 class="card-title" style={{ padding: '10px 0 0px 0' }}>Remarks || <span class={value.remarks === 1 ? "badge bg-success" : "badge bg-danger"} style={{ color: "white" }}>{remarks(value.remarks)}</span></h5>
                                    </div>
                                </div>

                                <table class="table table-borderless datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Subject Knowledge</th>
                                            <th scope="col">Communication</th>
                                            <th scope="col">Conviction</th>
                                            <th scope="col">Aspiration</th>
                                            <th scope="col">Eligibility</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                           <th scope="row"><span class="badge bg-success" >{value.subject_knowledge}</span></th>
                                           <td><span class="badge bg-primary" >{value.communication}</span></td>
                                           <td class="text-primary"><span class="badge bg-success" >{value.conviction}</span></td>
                                           <td><span class="badge bg-primary" >{value.aspiration}</span></td>
                                           <td><span class="badge bg-success" >{value.eligibility}</span></td>
                                           <td><span class="badge bg-primary">{value.total}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    })}
                    
                    
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button type="button" class="btn btn-primary mail-button" style={{ margin: "10px" }} onClick={(e) => dispatch(setShowFundModal(false))}
                        >Close</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default FundsModal;