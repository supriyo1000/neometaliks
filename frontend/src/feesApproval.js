import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ipAddress from './ipconfig';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setRefresh } from './actions/feesAction';
// import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

const FeesApproval = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState("");
    const [student, setStudent] = useState([]);
    const [coll_ID, setColl_Id] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentFees, setStudentFees] = useState([]);
    // const [status, setStatus] = useState(null);

    const dispatch = useDispatch();

    console.log(student);
    console.log(Array.isArray(studentFees)); // true if studentFees is an array, false otherwise


    const refresh = useSelector((state) => state.studentFees.refresh);

    const handleRoleChange = (event) => {
        const selectedyear = event.target.value;
        console.log('Selected Year:', selectedyear);
        setYear(selectedyear);
    };

    const acYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

    function generateFinancialYearOptions() {
        const currentYear = new Date().getFullYear();
        const options = [];

        for (let i = -1; i < 12; i++) {
            const startYear = currentYear + i;
            const endYear = startYear + 1;
            const optionText = `${startYear}-${endYear}`;
            options.push(<option key={i} value={optionText}>{optionText}</option>);
        }

        return options;
    }

    const updateStudentData = (response) => {
        const updatedStudents = response.reduce((acc, user) => {
            const existingUser = acc.find((item) => item.studentid === user.student_id);

            if (existingUser) {
                existingUser.amounts.push({ sem: user.semester, amt: user.amount, stat: user.status });
                // existingUser.semesters.push(user.semester);
            } else {
                acc.push({
                    studentid: user.student_id,
                    studentname: user.studentname,
                    collegename: user.collegename,
                    cof: user.cof,
                    amounts: [{ sem: user.semester, amt: user.amount, stat: user.status }],
                });
            }

            return acc;
        }, []);

        setStudent(updatedStudents);
    };

    // function headings(student) {
    //     // if (student.length>0) {
    //         let max = student[0].amounts.length;
    //         for (let i = 0; i < student.length; i++) {
    //             if (student[i].amounts.length > max) {
    //                 max = student[i].amount.length;
    //             }
    //         }

    //         const headingElements = [];
    //         for (let i = 0; i < max; i++) {
    //             headingElements.push(
    //                 <th key={i} scope="col" style={{ fontSize: "13px" }}>
    //                     Semester - {i + 1}
    //                 </th>
    //             );
    //         }

    //         return headingElements;
    //     // }

    // }

    const handleCheckboxChange = (event, parameter,userid) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            // Checkbox is checked, add to setStudentFees array
            setStudentFees((prevFees) => [
                ...prevFees,
                {stuid:userid, sem: parameter, amount: event.target.value },
            ]);
        } else {
            // Checkbox is unchecked, remove from setStudentFees array
            setStudentFees((prevFees) =>
                prevFees.filter((fee) => fee.sem !== parameter)
            );
        }
    };

    console.log(studentFees);

    function sem(amounts, parameter, userid) {
        let result = 0;
        let bg = "warning";
        let clr = "black";
        let status = false;

        for (let i = 0; i < amounts.length; i++) {
            if (amounts[i].sem === parameter && amounts[i].stat === 1) {
                result = result + parseFloat(amounts[i].amt);
                bg = "success"; clr = "white"; status = true;
            }
            else if (amounts[i].sem === parameter && amounts[i].stat === 2) {
                result = result + parseFloat(amounts[i].amt);
                bg = "danger"; clr = "white"; status = true;
            }
            else if (amounts[i].sem === parameter && amounts[i].stat === 0) {
                result = result + parseFloat(amounts[i].amt);
            }
        }
        console.log(result);
        return <div style={{ width: "6rem", textAlign: "center" }}>
            <span className={result !== 0 ? `bg-${bg} text-${clr}` : ""} style={{ padding: "0.5em", border: result !== 0 ? "1px solid black" : "", borderRadius: "5px", fontSize:result!==0? "14px" : "16px" }}>{result}</span>
            {result !== 0 && status === false ? <div class="form-check" style={{ display: "flex", justifyContent: "center", marginTop: "1rem", borderRadius: "5px" }}>
                <input class="form-check-input" type="checkbox" style={{ boxShadow: "0px 1px 6px 2px #706969" }}
                value={result}
                id="flexCheckChecked"
                onChange={(e)=>handleCheckboxChange(e, parameter, userid)}
                />
            </div>: ""}
        </div>;
    }

    async function fetchdata() {
        const data = await fetch(`http://${ipAddress}:8000/users/colleges`).then(res => res.json()).then(dataset => setColleges(dataset));
        return data;
    }


    async function getStudentFees(mode, year, clg) {
        const response = await fetch(`http://${ipAddress}:8000/external/get_student_fees_for_approval?dbmode=${mode}&year=${year}&clgid=${clg}`).then(res => res.json());
        updateStudentData(response);
    }

    async function updateStudentFeesStatus(stat) {
        if (studentFees.length === 0) {
            alert('Please Select a Student Fee');
        } else {
            const response = await axios.post(`http://${ipAddress}:8000/external/get_student_fees_for_approval_status`, {
                studentFees: studentFees, status: stat
            });
            console.log(response);
            setStudentFees([]);
            dispatch(setRefresh(!refresh));
            alert(stat === 1 ? "Student Fees Approval Successfull!!" : "Student Fees Rejected!!")
        }
    }

    // async function fetchstudent(clg) {

    //     const data = await fetch(`http://${ipAddress}:8000/external/getReadyforFund_students?clgid=${clg}`).then(res => res.json()).then(dataset => {
    //         setStudents(dataset);
    //         console.log(data);
    //     });

    // }

    useEffect(() => {

        console.log(coll_ID);
        console.log(acYear);

        if (coll_ID !== null) {
            getStudentFees(6, year !== "" ? year : acYear, coll_ID);
        }
    }, [coll_ID, year, refresh])

    useEffect(() => {
        fetchdata();

    }, [students, refresh])

    useEffect(() => {
        setStudentFees([]);   
    },[coll_ID])

    // useEffect(() => {
    //     fetchstudent(coll_ID);
    // }, [coll_ID])

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main" style={{ marginLeft: "240px" }}>

                {isLoading && <div className='overlay'>

                    <div className="loading-container" style={{ zIndex: "1" }}>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                }

                <div>
                    {/* <label for="table-container">Users Status </label> */}
                    <div className="container" id='table-container' style={{ padding: "40px", position: "relative", boxShadow: "1px -1px 9px 3px #a3a3a3", background: "white", marginTop: "10rem" }}>
                        <div className='card' style={{ padding: "20px" }}>

                            <div className='row'>
                                <div className='col-3'>
                                    <h5 class="card-title">Select College</h5>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => { setColl_Id(e.target.value) }}>
                                        <option selected>Open this select menu</option>
                                        {colleges.map((college, index) => {
                                            return <option value={college.coll_ID} key={index} >{college.collegename}</option>
                                        })}

                                    </select>
                                </div>
                                <div className='col-3'>
                                    <h5 class="card-title">Select Date</h5>
                                    <select class="form-select" value={year} style={{ width: "70%", height: "fit-content", fontSize: "14px" }}
                                        onChange={(e) => {
                                            handleRoleChange(e);
                                            getStudentFees(6, e.target.value, coll_ID)
                                        }} aria-label="Default select example">
                                        <option value={''} selected>Select Year</option>
                                        {generateFinancialYearOptions()}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <h5 class="card-title" style={{textAlign:"center"}}>Fund Approval</h5>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <button className='btn btn-outline-success mail-button' style={{ margin: "5px" }} onClick={()=> updateStudentFeesStatus(1)}>Approve</button>

                                        <button className='btn btn-outline-danger mail-button' style={{ margin: "5px" }} onClick={() => updateStudentFeesStatus(2)}>Reject</button>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    {/* {coll_ID} {year} */}
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div className='bg-success' style={{ width: "2rem", height: "1rem", border: "1px solid black" }}></div>&nbsp;&nbsp;&nbsp;- Approved
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div className='bg-warning' style={{ width: "2rem", height: "1rem", border: "1px solid black" }}></div>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp; Pending
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div className='bg-danger' style={{ width: "2rem", height: "1rem", border: "1px solid black" }}></div>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; Reject&nbsp;&nbsp;&nbsp;
                                            </p>
                                        </div>
                                        {/* <p>Fund Approval</p>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <button className='btn btn-outline-success mail-button' style={{ margin: "5px" }}>Approve</button>

                                            <button className='btn btn-outline-danger mail-button' style={{ margin: "5px" }}>Reject</button>
                                        </div> */}
                                        {/* <div style={{ display: "flex", justifyContent: "end" }}>
                                            <button className='btn btn-outline-danger mail-button'>Reject</button>
                                        </div> */}
                                    </div>
                                </div>


                                {/* <button className='btn btn-success mail-button' >Show</button> */}
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontSize: "13px" }}>Name</th>
                                        <th scope="col" style={{ fontSize: "13px" }}>Installment</th>
                                        <th scope="col" style={{ fontSize: "13px" }}>Course</th>
                                        {/* {student &&student.length>0 && headings(student)} */}
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-1</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-2</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-3</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-4</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-5</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-6</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-7</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-8</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-9</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-10</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-11</th>
                                        <th scope="col" style={{ fontSize: "13px", textAlign: "center" }}>Semester-12</th>
                                        {/* <th scope="col" style={{ fontSize: "13px", width: "2rem" }}>Update</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.map((user, i) => (
                                        <tr key={i}>

                                            <td className="text-primary" style={{ fontSize: "14px" }}><p style={{ width: "6rem" }}>{user.studentname}</p></td>

                                            <td className="text-dark" style={{ fontSize: "13px" }}><p style={{ width: "10rem" }}>{user.collegename}</p></td>

                                            <td className="text-primary" style={{ fontSize: "14px" }}><p style={{ width: "6rem" }}>{user.cof}</p></td>


                                            <td className="text-success" style={{ fontSize: "16px" }}>
                                                {sem(user.amounts, 'semester-1', user.studentid)}
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-2', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-3', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-4', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-5', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-6', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-7', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-8', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-9', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-10', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-11', user.studentid)}
                                                    
                                            </td>
                                            <td className="text-success">
                                                
                                                {sem(user.amounts, 'semester-12', user.studentid)}
                                                    
                                            </td>

                                            {/* <td><button className='btn btn-outline-primary mail-button'>Update</button></td>

                                            <td><button className='btn btn-outline-success mail-button'>Approve</button></td>

                                            <td><button className='btn btn-outline-danger mail-button'>Reject</button></td> */}
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default FeesApproval;
