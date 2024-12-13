import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowDisbursedModal, setStudentDetails } from '../actions/disbursedAction';
import { useNavigate } from 'react-router-dom';
import ipAddress from '../ipconfig';
import axios from "axios";

const DisbursedModal = (props) => {

    const [details, setDetails] = useState([]);
    const [acEmail, setAcEmail] = useState("");
    const [status, setStatus] = useState({});
    const [receipt, setReceipt] = useState("");
    const [result, setResult] = useState("");
    const [bankname, setBankname] = useState("");
    const [utr, setUtr] = useState("");
    const [tdate, setTdate] = useState("");
    const [tamount, setTamount] = useState("");

    const showDisbursedModal = useSelector((state) => state.disbursed.disbursedmodal);
    const approver_id = localStorage.getItem("processNo");

    console.log(details[0]);

    console.log(utr);
    console.log(utr.length);
    console.log(typeof(utr.length));

    const stuDes = useSelector((state) => state.disbursed.studentdetails);

    async function getStudentDetails(userid, sem) {
        const data = await fetch(`http://${ipAddress}:8002/images/get_student_disbursment_details?stuid=${userid}&semester=${sem}`).then(res => res.json()).then(dataset => {
            setDetails(dataset);
            console.log(dataset);
        });
    }

    const formData = new FormData();
    formData.append("receipt", receipt);

    // async function handleSubmitReceipt(studentId, semester) {
    //     if (receipt === "") {
    //         alert("Please Select a Receipt!!")
    //     }
    //     else {
    //         const data = await axios.post(`http://${ipAddress}:8002/images/upload_receipt?userid=${studentId}&semester=${semester}`,
    //             formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data", // Set the correct content type for FormData
    //             },
    //         }
    //         )
    //         alert("Student Receipt Uploaded Successfully!!")
    //         window.location.reload();
    //     }
    // }


    async function handleTransactionDetails(studentId, semester) {

        console.log(typeof (tamount), typeof (details[0].amount));

        if (bankname === "") {
            alert("Please enter The Bank Name!!")
        }
        else if (utr === "") {
            alert("Please enter The UTR No!!")
        }
        else if (utr.length !== 15 && utr.length !== 16) {
            alert("The UTR No cannot Less Than 15 or More than 16 Character !!")
        }
        else if (tdate === "") {
            alert("Please Select Transaction Date!!")
        }
        else if (tamount === "") {
            alert("Please enter The Transaction Amount!!")
        }
        else if (parseInt(tamount, 10) !== details[0].amount) {
            alert("Allocated Semester Fees is Not Matching With Transaction Amount!!")
        }
        else {
            const response = await axios.post(`http://${ipAddress}:8002/images/insert_transaction_details`, {
                stuid: studentId, sem: semester, bank: bankname, utrno: utr, date: tdate, amnt: parseInt(tamount, 10)
            })
            alert("Transaction Details Submitted Successfully!!");
            Window.location.reload();
        }

    }

    async function fetchstudentStatus(id, sem) {
        const data = await fetch(`http://${ipAddress}:8002/images/get_student_disbursment_status?stuid=${id}&semester=${sem}`).then(res => res.json()).then(dataset => {
            setStatus(dataset);
            console.log(dataset);
        });
    }

    function checkUTR(val) {
        if (val.length !== 15 && val.length !== 16) {
            return <small className='text-danger p-2'>The UTR No cannot Less Than 15 or More than 16 Character !!</small>
        } else {
            return '';
        }
    }

    // async function handleSubmit() {


    //     const response = axios.post(`http://${ipAddress}:8002/images/get_student_disbursment_details`, {
    //         stuid: stuDes.stuid, sem: stuDes.semester, amnt: details[0].amount,
    //         i_month: details[0].ins_month, ac_year: details[0].academic_year,
    //         email: acEmail, app_id: approver_id
    //     })
    //     console.log(response);
    //     alert("Student Fund Disbursement Successfully!!");
    // }

    function formatDateString(originalDateString) {
        const originalDate = new Date(originalDateString);

        const yyyy = originalDate.getFullYear();
        const mm = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const dd = originalDate.getDate().toString().padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    }

    async function handleSubmit(status) {
        const confirmed = window.confirm("Are you sure you want to proceed?");

        console.log("Data being sent:", {
            stuid: stuDes.stuid,
            sem: stuDes.semester,
            amnt: details[0].amount,
            i_month: details[0].ins_month,
            ac_year: details[0].academic_year,
            email: acEmail,
            app_id: approver_id,
            stat: status
        });

        if (confirmed) {
            if (acEmail === "") {
                alert("Please enter Account's Email Address!!");
            } else {
                const response = await axios.post(`http://${ipAddress}:8002/images/insert_student_disbursment`, {
                    stuid: stuDes.stuid, sem: stuDes.semester, amnt: details[0].amount,
                    i_month: formatDateString(details[0].ins_month), ac_year: details[0].academic_year,
                    email: acEmail, app_id: parseInt(approver_id, 10), stat: status
                    , stuname: details[0].studentname, colname: details[0].collegename
                }
                );

                console.log(response);
                alert("Mail Send for Disbursment Successfully!!");
                window.location.reload();
            }
        } else {
            alert("Operation canceled by user.");
        }
    }

    console.log(status);
    console.log(stuDes);
    console.log(showDisbursedModal);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    // const resultButton = async (id, sem, filename) => {

    //     console.log(id, sem, filename);

    //     const data = await fetch(`http://${ipAddress}:8002/images/get_student_result_file?stuid=${id}&semester=${sem}`).then(res => res.json()).then(dataset => {
    //         setResult(dataset);
    //         console.log(dataset);
    //     });

    // //     const pdfUrl = result? `http://103.184.242.29:8002/uploads/${result[0].result_file}`
    //     // : "";

    //     const pdfUrl =`http://localhost:8002/uploads/qlogo.jpg`;

    //     // const link = document.createElement('a');
    //     // link.href = pdfUrl;
    //     // link.download = `${filename}-${sem}-Result`; // Set the desired file name
    //     // link.click();

    //     // localStorage.setItem('studentid', id);
    //     // localStorage.setItem('class', sem);
    //     // navigate('/showresult');


    //     const blob = result ? result[0].result_file.blob() : "";

    //     // Create a blob URL from the blob data
    //     const url = URL.createObjectURL(blob);

    //     // Create a temporary anchor element to trigger the download
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = filename; // Set the desired file name
    //     link.style.display = 'none';

    //     // Append the anchor element to the document and trigger the download
    //     document.body.appendChild(link);
    //     link.click();

    //     // Clean up by removing the anchor element
    //     document.body.removeChild(link);
    // }

    const resultButton = async (id, sem, filename) => {
        console.log(id, sem, filename);

        try {
            const response = await fetch(
                `http://${ipAddress}:8002/images/get_student_result_file?stuid=${id}&semester=${sem}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch the result file.');
            }

            const result = await response.json();

            if (!result || !result[0] || !result[0].result_file) {
                throw new Error('Result file not found.');
            }

            const pdfUrl = `http://${ipAddress}:8002/uploads/${result[0].result_file}`;

            const blobResponse = await fetch(pdfUrl);
            const blob = await blobResponse.blob();

            // Create a blob URL from the blob data
            const url = URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}-${sem}-Result`; // Set the desired file name
            link.style.display = 'none';

            // Append the anchor element to the document and trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error.message);
            // Handle the error as needed
        }
    };


    console.log(receipt);

    useEffect(() => {
        getStudentDetails(stuDes.stuid, stuDes.semester)
        fetchstudentStatus(stuDes.stuid, stuDes.semester)
    }, [stuDes])

    return (
        <React.Fragment>

            <div className='overlay'>

                <div className='container modal-container'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => {
                                dispatch(setShowDisbursedModal(false));
                                dispatch(setStudentDetails({}));
                            }}></button>
                        </div>
                        <div className='col-md-8' style={{ alignSelf: "center", textAlign: "center" }}>
                            <h4 class="card-title" style={{ fontSize: "22px", padding: 0 }}>Student's Fund Disbursedment</h4>
                        </div>
                    </div>

                    <div>
                        {/* <label for="table-container">Users Status </label> */}
                        <div className="container" id='table-container' >
                            <div className='card' style={{ padding: "20px" }}>

                                <div className='row' style={{ justifyContent: "space-around" }}>
                                    <div className='col-3'>
                                        <h5 class="card-title" style={{ padding: "0" }}>Name</h5>
                                        <p>{stuDes.stuName}</p>
                                    </div>
                                    <div className='col-3'>
                                        <h5 class="card-title" style={{ padding: "0" }}>Semester</h5>
                                        <p>{stuDes.semester}</p>
                                    </div>
                                    <div className='col-3'>
                                        <h5 class="card-title" style={{ padding: "0" }}>Amount</h5>
                                        <p>{details && details[0] && details[0].amount}</p>
                                    </div>
                                    <div className='col-2' style={{ textAlign: "center", alignSelf: "center" }}>
                                        <button className='btn btn-outline-success mail-button' onClick={() => resultButton(stuDes.stuid, stuDes.semester, stuDes.stuName)}>Result</button>
                                    </div>
                                </div>
                            </div>
                            <div className='card' style={{ padding: "20px" }}>
                                <div class="pagetitle">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <h5 class="card-title" style={{ padding: "0" }}>Enter Acount's Email</h5>
                                        </div>
                                        <div className='col-md-6'>
                                            {status && status.status === 2 ? <p style={{ color: "red" }}>**Semester Fees Rejected**</p> : ""}
                                        </div>
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className='col-7' style={{ alignSelf: "center" }}>
                                        <input type="email" class="form-control" placeholder="Email" onChange={(e) => setAcEmail(e.target.value)} />

                                    </div>
                                    <div className='col-5' style={{ textAlign: "center", alignSelf: "center" }}>
                                        <button className='btn btn-outline-success mail-button m-3' disabled={status.status !== 0} onClick={() => handleSubmit(1)}>Approve</button>

                                        <button className='btn btn-outline-danger mail-button m-3' disabled={status.status !== 0} onClick={() => handleSubmit(2)}>Reject</button>
                                    </div>
                                </div>
                            </div>

                            {/* <div className='card' style={{ padding: "20px" }}>
                                <div class="pagetitle">
                                    <h5 class="card-title">Upload Payment Receipt</h5>
                                </div>
                                <div className='row'>
                                    <div className='col-7' style={{ alignSelf: "center" }}>
                                        <input type="file" class="form-control" onChange={(e)=>setReceipt( e.target.files[0])}/>

                                    </div>
                                    <div className='col-5' style={{ textAlign: "center", alignSelf: "center" }}>
                                        <button className='btn btn-outline-primary mail-button' disabled={status.status === 2 || status.status=== 3} onClick={() => handleSubmitReceipt(stuDes.stuid, stuDes.semester)}>Upload</button>

                                    </div>
                                </div>
                            </div> */}

                            {/* <div className='card' style={{ padding: "20px" }}>
                                <div class="pagetitle">
                                    <h5 class="card-title">Upload Payment Receipt</h5>
                                </div> */}
                            <div className='row'>
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Transaction Details</h5>

                                        {/* <!-- No Labels Form --> */}
                                        <form class="row g-3">
                                            <div class="col-md-12">
                                                <input type="text" value={bankname} class="form-control" placeholder="Bank Name" onChange={(e) => setBankname(e.target.value)} />
                                            </div>
                                            <div class="col-md-12">
                                                <input type="text" value={utr} class="form-control" placeholder="UTR Number" onChange={(e) => setUtr(e.target.value)} />
                                                {checkUTR(utr)}
                                            </div>
                                            <div class="col-md-6">
                                                <input type="date" value={tdate} class="form-control" placeholder="date" onChange={(e) => setTdate(e.target.value)} />
                                            </div>
                                            <div class="col-md-6">
                                                <input type="number" value={tamount} class="form-control" placeholder="Amount" onChange={(e) => setTamount(e.target.value)} />
                                            </div>

                                        </form>
                                        {/* <!-- End No Labels Form --> */}
                                        <div className='col-5 mt-3'>
                                            <button className='btn btn-outline-primary mail-button' disabled={status.status === 2 || status.status === 3} onClick={() => handleTransactionDetails(stuDes.stuid, stuDes.semester)}>Submit</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* </div> */}


                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <button type="button" class="btn btn-danger mail-button" onClick={() => {
                                dispatch(setShowDisbursedModal(false));
                                dispatch(setStudentDetails({}));
                            }}>Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default DisbursedModal;