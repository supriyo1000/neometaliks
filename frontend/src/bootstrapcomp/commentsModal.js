import React, { useState } from 'react'
import { setFetchData, setShowCsrMdComment } from '../actions/interviewtime';
import { useDispatch, useSelector } from 'react-redux';
import ipAddress from '../ipconfig';
import axios from 'axios';

const CommentsModal = (props) => {
    // const name = props.name;
    const btnCode = props.btnCode;
    const approverCode = props.approverCode;
    const stuid = props.stid;
    const details = props.alldetails;

    console.log(btnCode);
    console.log(details);

    const fetchdata = useSelector((state) => state.interview.fetchdata);

    async function changestate(isdata) {
        dispatch(setFetchData(!isdata));
    }

    const [cmnt, setCmnt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const approverId = localStorage.getItem("processNo");

    const dispatch = useDispatch();

    async function approval() {
        if (cmnt === '') {
            alert("Please Enter Comment")
        } else {
            setIsLoading(true);
            const response = await axios.post(`http://${ipAddress}:8000/interview/csr_md_approval`, {
                dbmode: approverCode === 1 ? 1 : 2, stuid: stuid, appId: parseInt(approverId, 10), comments: cmnt, status: btnCode === 1 ? 1 : 2, stuname: details.studentname, 
                clgname: details.collegename, stumail: details.stuEmail, clgmail: details.clgMail
            })
            if (btnCode === 1) {
                alert("Approved Successfully")
            } else {
                alert("Student Rejected")
            };
            setIsLoading(false);
            dispatch(setShowCsrMdComment(false));
            changestate(fetchdata);
            console.log(response);
        }
    }


    return (
        <React.Fragment>
            <div className='overlay'>
                {isLoading && (
                    <div className="loading-container" style={{zIndex:"10"}}>
                        <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                    </div>
                )}
                <div className='container modal-container' style={{ maxWidth: "60%" }}>
                    <div className='row'>
                        <div className='col-md-2'>
                            <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={(e) => dispatch(setShowCsrMdComment(false))} disabled={isLoading}
                            ></button>
                        </div>
                        {/* <div className='col-md-6' style={{ alignSelf: "center", textAlign: "center" }}>
                          <h4 style={{ fontWeight: "bold" }}>Interview Feedbacks</h4>
                      </div> */}
                    </div>
                    <div class="card recent-sales overflow-auto" style={{ height: "100%" }}>
                        <div class="card-body">

                            <div class="pagetitle">
                                <h1>{approverCode === 1? "CSR" : "MD"} Approval</h1>
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html">Comments</a></li>
                                        <li class="breadcrumb-item active">{approverCode === 1 ? "CSR" : "MD"} Approval</li>
                                    </ol>
                                </nav>
                            </div>

                            <textarea type="text" style={{ height: "100px" }} placeholder='Enter your Comments' onChange={(e) => setCmnt(e.target.value)} />

                        </div>
                    </div>


                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button type="button" class="btn btn-danger mail-button" style={{ margin: "10px" }} onClick={(e) => dispatch(setShowCsrMdComment(false))} disabled={isLoading}
                        >Close</button>
                        <button type="button" class="btn btn-success mail-button" style={{ margin: "10px" }} onClick={approval} disabled={isLoading}
                        >{btnCode === 1 ? "Approve" : "Reject"}</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default CommentsModal
