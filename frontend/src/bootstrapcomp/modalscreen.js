import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMdmodal } from '../actions/dashboardAction';
import axios from 'axios';
import ipAddress from '../ipconfig';


const Modalscreen = (props) => {

    const [comment2, setComments2] = useState("")
    const [check, setCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkdetails = () => {
        return setCheck(!check);
    }

    const details = props.alldetails;
    console.log(details);
    const dispatch = useDispatch()

    const date = new Date();
    const datenow = date.toISOString().slice(0, 19).replace('T', ' ');

    const mdmodal = useSelector((state) => state.dashboard.mdmodal);
    console.log("mdmodal", mdmodal);

    const adminid = localStorage.getItem("processNo");

    async function submitComment(approve) {
        if (comment2 === "") {
            alert("Comment is Mandatory");
        } else {
            setIsLoading(true);

            const response = await axios.post(`http://${ipAddress}:8000/users/firstAprove`, {
                dbmode: 3, colId: null, stuId: details.serialno, sname: null, sphone: null, sgrade: null, smarks: null, semail: null, cmnt1: null, roleid: null, comment2: comment2, fapprove: approve, sec_userid: adminid, fdate: '2023-10-27', finaldate: datenow, stuname: details.studentname, stuemail: details.email
            });
            setIsLoading(false);
            console.log(response);
            if (approve === 1) {
                alert("Mail Sent To Student Successfully");
            }
            else if (approve === 2) {
                alert("Student Rejected!!");   
            }
            
            window.location.reload();
            dispatch(setMdmodal(false));
        }

    }

    console.log(details.snamestatus);

    useEffect(() => {
        if (details !== null) {
            checkdetails();
        }
    }, [])

    return (
        <React.Fragment>

            {mdmodal &&

                <div className='overlay'>

                    {isLoading && (
                        <div className="loading-container">
                            <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                        </div>
                    )}

                    <div className='container modal-container'>
                        <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => dispatch(setMdmodal(false))}></button>

                        {/* <p>Name - {details.studentname}</p> */}
                        <table class="table table-success table-striped">
                            {/* <thead>
                                <tr>
                                    <th scope="col">Result</th>
                                    <th scope='col'>1st Approval Status</th>
                                </tr>
                            </thead> */}
                            <tbody>

                                <tr>
                                    <td>Name</td>
                                    <td>{details.studentname}</td>


                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    {/* <td>{details.sphonestatus === 1 ? "Approved" : "Not Approved"}</td> */}
                                    <td>{details.studentphone}</td>


                                </tr>
                                <tr>
                                    <td>Grade</td>
                                    {/* <td>{details.sgradestatus === 1 ? "Approved" : "Not Approved"}</td> */}
                                    <td>{details.grade}</td>


                                </tr>
                                <tr>
                                    <td>Marks</td>
                                    {/* <td>{details.smarksstatus === 1 ? "Approved" : "Not Approved"}</td> */}
                                    <td>{details.studentmarks}</td>


                                </tr>
                                <tr>
                                    <td>Approved By</td>
                                    <td>{details.firstname} {details.lastname} ({details.roleName})</td>


                                </tr>
                                <tr>
                                    <td>1st Approver Comment</td>
                                    <td>{details.comment1}</td>


                                </tr>

                            </tbody>
                        </table>


                        <label>Comments<span style={{ marginLeft: "10px", color: "red" }}>*</span></label>
                        <textarea type="text" style={{ height: "150px" }} placeholder='Enter your Comments' onChange={(e) => setComments2(e.target.value)} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button type="button" class="btn btn-danger mail-button" onClick={() => dispatch(setMdmodal(false))}>Cancel</button>
                            <div>
                                <button type="button" class="btn btn-success mail-button" disabled={isLoading} style={{ marginRight: "15px" }} onClick={() => submitComment(1)}>Approve</button>
                                <button type="button" class="btn btn-warning mail-button" disabled={isLoading} style={{ fontWeight: "bold" }} onClick={() => submitComment(2)}>Decline</button>
                            </div>

                        </div>
                    </div>

                </div>
            }
        </React.Fragment>
    )
}

export default Modalscreen;