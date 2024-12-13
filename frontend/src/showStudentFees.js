import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ipAddress from './ipconfig';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setRefresh } from './actions/feesAction';

const ShowStudentFees = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState("");
    const [student, setStudent] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [editSem, setEditSem] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editAmount, setEditAmount] = useState(null);
    const [editUserId, setEditUserId] = useState(null);

    const dispatch = useDispatch();

    console.log(student);
    console.log(editSem);
    console.log(editAmount);
    console.log(editUserId);

    const handleRoleChange = (event) => {
        const selectedyear = event.target.value;
        console.log('Selected Year:', selectedyear);
        setYear(selectedyear);
    };

    const handleEditClick = (semester, index, userid) => {
        setEditSem(semester);
        setEditIndex(index);
        setEditUserId(userid);
    };

    async function SubmitEditAmount(studentId) {
        if (editAmount === null || editAmount === "0" || editSem === "" || studentId === "" || studentId === null) {
            alert(`Please Enter a valid ${editSem}  Value!!`);
        } else {
            const response = await axios.post(`http://${ipAddress}:8000/external/edit_student_fees`, {
                amount: editAmount, semester: editSem, userid: studentId
            });
            console.log(response);
            setEditAmount(null);
            setEditSem("");
            dispatch(setRefresh(!refresh));
            alert("Amount updated successfully")
        }
    }

    const refresh = useSelector((state) => state.studentFees.refresh);

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
            const existingUser = acc.find((item) => item.studentid === user.student_id );

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

    function sem(amounts, parameter, userid, index) {
        let result = 0;
        let bg = "warning";
        let clr = "black";
        let status = false;
        let approvalStatus = 0;

        for (let i = 0; i < amounts.length; i++) {
            if (amounts[i].sem === parameter && amounts[i].stat === 1) {
                result = result + parseFloat(amounts[i].amt);
                bg = "success"; clr = "white"; status = true; approvalStatus = 1;
            }
            else if (amounts[i].sem === parameter && amounts[i].stat === 2) {
                result = result + parseFloat(amounts[i].amt);
                bg = "danger"; clr = "white"; status = true; approvalStatus = 2;
            }
            else if (amounts[i].sem === parameter && amounts[i].stat === 0) {
                result = result + parseFloat(amounts[i].amt);
            }
        }

        console.log(result);

        return (
            <div style={{ width: "6rem", textAlign: "center" }}>
                {isEdit && editIndex === index && editSem === parameter && editUserId === userid ? (
                    <div>
                        <input type="number" style={{ width: "100%", marginBottom: "10px", paddingLeft: "5px" }} placeholder='eg. 100' onChange={(e) => setEditAmount(e.target.value)} />
                        <i class="bi bi-x-circle-fill" onClick={() => {
                            setIsEdit(false);
                            handleEditClick("", null, null);
                        }}></i>
                    </div>
                ) : (
                    <div>
                        <span
                            className={result !== 0 ? `bg-${bg} text-${clr}` : ""}
                            style={{
                                padding: "0.5em",
                                border: result !== 0 ? "1px solid black" : "",
                                borderRadius: "5px",
                                fontSize: result !== 0 ? "14px" : "16px"
                            }}
                        >
                            {result}
                        </span>
                        {approvalStatus !== 0 ? (
                            <i className="bi bi-pen-fill" onClick={() => {
                                setIsEdit(true);
                                handleEditClick(parameter, index, userid)
                            }} style={{ marginLeft: "10px" }}></i>
                        ) : (
                            ""
                        )}

                    </div>
                )}
            </div>
        );
    }

    async function getStudentFees(mode, year) {
        const response = await fetch(`http://${ipAddress}:8000/external/get_student_fees?dbmode=${mode}&year=${year}`).then(res => res.json());
        updateStudentData(response);
    }

    useEffect(() => {
        getStudentFees(3, acYear);
    }, [])

    useEffect(() => {
    getStudentFees(3,year)    
    },[refresh])

    useEffect(() => {
        setEditAmount(null);
        setEditSem("");
        setEditUserId(null);
    }, [year])

    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" className="main" style={{ marginLeft: "240px" }}>

                {isLoading && (
                    <div className="loading-container" style={{ zIndex: "1" }}>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                <div>
                    <div className="container" id='table-container' style={{ padding: "40px", position: "relative", boxShadow: "1px -1px 9px 3px #a3a3a3", background: "white", marginTop: "10rem" }}>
                        <div className='card' style={{ padding: "20px" }}>

                            <div className='row'>
                                <div className='col-6'>
                                    <h5 class="card-title">Select Academic Year</h5>
                                    <select class="form-select" value={year} style={{ width: "70%", height: "fit-content", fontSize: "14px" }}
                                        onChange={(e) => {
                                            handleRoleChange(e);
                                            getStudentFees(3, e.target.value)
                                        }} aria-label="Default select example">
                                        <option value={acYear} selected>{acYear}</option>
                                        {generateFinancialYearOptions()}
                                    </select>
                                </div>
                                <div className='col-6'>
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontSize: "13px" }}>Name</th>
                                        <th scope="col" style={{ fontSize: "13px" }}>Installment</th>
                                        <th scope="col" style={{ fontSize: "13px" }}>Course</th>
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
                                        <th scope="col" style={{ fontSize: "13px", width: "2rem" }}>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.map((user, i) => (
                                        <tr key={i}>

                                            <td className="text-primary" style={{ fontSize: "14px" }}><p style={{ width: "6rem" }}>{user.studentname}</p></td>

                                            <td className="text-dark" style={{ fontSize: "13px" }}><p style={{ width: "10rem" }}>{user.collegename}</p></td>

                                            <td className="text-primary" style={{ fontSize: "14px" }}><p style={{ width: "6rem" }}>{user.cof}</p></td>

                                            <td className="text-success" style={{ fontSize: "16px" }}>
                                                {sem(user.amounts, 'semester-1', user.studentid, 1)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-2', user.studentid, 2)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-3', user.studentid, 3)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-4', user.studentid, 4)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-5', user.studentid, 5)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-6', user.studentid, 6)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-7', user.studentid, 7)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-8', user.studentid, 8)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-9', user.studentid, 9)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-10', user.studentid, 10)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-11', user.studentid, 11)}

                                            </td>
                                            <td className="text-success">

                                                {sem(user.amounts, 'semester-12', user.studentid, 12)}

                                            </td>
                                            <td className="text-success">
                                                <button className='btn btn-primary mail-button' onClick={() => SubmitEditAmount(user.studentid)}>Update</button>

                                            </td>
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

export default ShowStudentFees
