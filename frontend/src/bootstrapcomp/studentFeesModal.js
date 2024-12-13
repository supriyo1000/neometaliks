import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import withAuth from '../withauth';
// import Table from './table';
import ipAddress from "../ipconfig.js";
import { setFeesModal } from '../actions/feesAction.js';

const StudentFeesModal = (props) => {
    const [inputs, setInputs] = useState([{ semester: "", amount: null, month: "", year: '' }]);
    const [mailstate, setMailstate] = useState(false);
    const [msgs, setMsgs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [fees, setFees] = useState([]);
    // const [dis, setDis] = useState(false);
    const inputRef = useRef([]);
    const dispatch = useDispatch();

    const student_id = props.studentId;
    const student = props.student;
    const course = props.course;

    console.log(student_id);
    console.log(fees);
    console.log(mailstate);
    const feesmodal = useSelector((state) => state.studentFees.feesmodal);

    async function fetchstatus() {
        const data = await fetch(`http://${ipAddress}:8000/users/emailstatus`).then(res => res.json()).then(dataset => setMsgs(dataset));
        return data;
    }

    const totalnumber = () => {
        // Calculate the total
        const newTotal = inputs.reduce((acc, input) => acc + (input.amount || 0), 0);

        // Update the total state
        setTotal(newTotal);

        // Return the total
        return newTotal;
    };

    const handleKeyDown = (e) => {
        // Prevent any keypress events for manual input
        e.preventDefault();
    };


    function isMonthInAcademicYear(academicYear, selectedMonth) {
        // Extract start and end years from the academic year string
        const [startYear, endYear] = academicYear.split('-').map(Number);
        console.log(startYear, endYear);
        // const [month, year] = selectedMonth.split(',').map(item => item.trim());
        // console.log(month, year);
        // // Convert selectedMonth to a numerical value (0-indexed, where January is 0)
        // const selectedMonthIndex = new Date(Date.parse(selectedMonth + ' 1, 2000')).getMonth();
        // console.log(selectedMonthIndex);
        // // Define academic year start and end dates
        const academicYearStart = `${startYear}-04-01`; // April 1 of the start year
        const academicYearEnd = `${endYear}-03-31`; // March 31 of the end year
        console.log(academicYearStart, academicYearEnd);
        // // Create the selected date object
        // const selectedDate = new Date(`${year}-${month}-01`);
        // console.log(selectedDate);
        // const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
        // console.log(formattedSelectedDate);

        // // Check if the selected date is within the academic year
        console.log(selectedMonth >= academicYearStart && selectedMonth <= academicYearEnd);
        return selectedMonth >= academicYearStart && selectedMonth <= academicYearEnd;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // const academicyear = "2023-2024";
    // const selectedMonth = "June,2023";

    // const isSelectedMonthInAcademicYear = isMonthInAcademicYear(academicyear, selectedMonth);

    // console.log(`Selected month (${selectedMonth}) is in the academic year ${academicyear}: ${isSelectedMonthInAcademicYear}`);

    console.log(inputs);

    const handleInputChange = (index, field, value) => {
        const updatedInputs = [...inputs];

        if (field === "year" || field === "semester") {
            updatedInputs[index][field] = value;
        }
        else if (field === "month") {
            // updatedInputs[index][field] = value;
            const monthValue = `${value}-01`;
            updatedInputs[index][field] = monthValue;
            // console.log(monthValue[1]);
            // updatedInputs[index][field] = parseInt(monthValue[1]) < 10 ? parseInt("0" + monthValue[1]) : parseInt(monthValue[1]);
        }
        else {
            updatedInputs[index][field] = parseFloat(value, 10);
        }

        setInputs(updatedInputs);
    };

    const handleAddInput = () => {
        if ((fees.length + inputs.length) > 11) {
            return null;
        } else {
            setInputs([...inputs, { amount: null, month: null, year: '' }]);
        }
    };

    const handleRemoveInput = (index) => {
        if (inputs[index].amount || inputs[index].month || inputs[index].year) {
            const result = window.confirm("This input has a value. Are you sure you want to remove it?");
            if (result) {
                const updatedInputs = [...inputs];
                updatedInputs.splice(index, 1);
                setInputs(updatedInputs);
            } else {
                return null;
            }
        } else {
            const updatedInputs = [...inputs];
            updatedInputs.splice(index, 1);
            setInputs(updatedInputs);
        }
    };

    const academicYear = () => {
        let start = 2022;
        let count = 10;
        let options = [];

        for (let i = 0; i < count; i++) {
            const optionText = `${start + i}-${start + i + 1}`;
            options.push(<option key={i} value={optionText}>{optionText}</option>);
        }

        return options;
    }

    const getMonthFormat = (isoDateString) => {
        const dateObject = new Date(isoDateString);
        // Format the month and year
        const formatted = `${dateObject.toLocaleString('en-US', { month: 'long' })}, ${dateObject.getFullYear()}`;

        return formatted;
    }

    const approver_id = localStorage.getItem("processNo");

    async function handleSubmit() {
        if (inputs.length === 0) {
            alert("Please Fill The necessary Fields!!")
        }
        else {
            let falsemonth = 0;
            let repeatmonth = 0;
            let isEmptyField = 0;
            let repeatsemester = 0;

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].semester === "" || inputs[i].amount === null || inputs[i].amount === 0 || inputs[i].month === "" || inputs[i].year === "") {
                    isEmptyField = isEmptyField + 1;
                }
            }

            for (let i = 0; i < inputs.length; i++) {
                const isSelectedMonthInAcademicYear = isMonthInAcademicYear(inputs[i].year, inputs[i].month);
                console.log(`${i}`, isSelectedMonthInAcademicYear);
                if (isSelectedMonthInAcademicYear === false) {
                    falsemonth = falsemonth + 1
                }
            }

            for (let i = 0; i < fees.length; i++) {
                for (let j = 0; j < inputs.length; j++) {
                    if (formatDate(fees[i].ins_month) === inputs[j].month) {
                        repeatmonth = repeatmonth + 1;
                    }
                }
            }

            for (let i = 0; i < inputs.length; i++) {
                for (let j = i + 1; j < inputs.length; j++) {
                    if (inputs[i].month === inputs[j].month) {
                        repeatmonth = repeatmonth + 1;
                    }
                }
            }

            for (let i = 0; i < fees.length; i++) {
                for (let j = 0; j < inputs.length; j++) {
                    if (fees[i].semester === inputs[j].semester) {
                        repeatsemester = repeatsemester + 1;
                        console.log("repeatsemester1", repeatsemester);
                    }
                }
            }

            for (let i = 0; i < inputs.length; i++) {
                for (let j = i + 1; j < inputs.length; j++) {
                    if (inputs[i].semester === inputs[j].semester) {
                        repeatsemester = repeatsemester + 1;
                        console.log("repeatsemester2", repeatsemester);
                    }
                }
            }

            console.log(fees);
            console.log(inputs);
            console.log(repeatsemester);

            if (isEmptyField > 0) {
                alert("Input field Cannot be empty!!")
            }
            else if (falsemonth > 0) {
                alert("Please Check Academic Year!!")
            } else if (repeatmonth > 0) {
                alert("Cannot Repeat Month!!")
            } else if (repeatsemester > 0) {
                alert("Cannot Repeat Semester!!")
            }
            else {
                setIsLoading(true);
                const response = await axios.post(`http://${ipAddress}:8000/external/insert_student_fees`, { stuid: student_id, form: inputs, appid: approver_id })
                setIsLoading(false);
                setInputs([{ amount: null, month: null, year: '' }]);
                dispatch(setFeesModal(false));
                alert(`Fund Allocated for ${student} Successfully!!`);
                window.location.reload();
            }
        }
    }

    function semester() {
        let options = [];

        for (let i = 0; i < 12; i++) {
            let optionText = `semester-${i + 1}`;
            options.push(<option key={i} value={optionText}>{optionText}</option>)
        }

        return options;
    }

    async function getStudentFees(mode, id) {
        const response = await fetch(`http://${ipAddress}:8000/external/get_individual_student_fees?dbmode=${mode}&userid=${id}`).then(res => res.json());
        setFees(response);
    }

    useEffect(() => {
        getStudentFees(5, student_id);
    }, [student_id])


    useEffect(() => {
        fetchstatus();
        // getStudentFees(5, student_id);
        console.log(msgs);
    }, [mailstate])

    useEffect(() => {
        totalnumber();
    }, [inputs])

    return (
        <React.Fragment>

            {feesmodal &&

                <div className='overlay' style={{ alignItems: "center" }}>

                    {isLoading && (
                        <div className="loading-container">
                            <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                        </div>
                    )}

                    <div style={{ marginBottom: "60px", height: "70vh", width: "80vw", background: "white", padding: "20px", borderRadius: "10px", maxHeight: "80vh", overflowY: "scroll" }} className='collegesearch'>

                        <div>
                            <button type="button" class="btn-close" style={{ width: "3em", height: "3em", boxShadow: "0px 0 9px 0px rgb(2 73 201 / 66%)" }} onClick={() => { setInputs([{ amount: null, month: null, year: '' }]); dispatch(setFeesModal(false)); }}></button>
                        </div><hr />

                        <div className='d-flex' style={{ justifyContent: "space-between" }}>
                            <div class="pagetitle">
                                <h1>{student}</h1>
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html">Course</a></li>
                                        <li class="breadcrumb-item active">{course}</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="col-xxl-4 col-md-4">
                                <div class="card info-card revenue-card" style={{ boxShadow: "0px 0 15px 2px rgb(1 41 112 / 29%)" }}>

                                    <div class="card-body">
                                        <h5 class="card-title">Total Amount</h5>

                                        <div class="d-flex align-items-center">

                                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i class="bi bi-person-fill"></i>
                                            </div>
                                            <div class="ps-3">
                                                <h6>{total}</h6>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='row'>

                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "bold", color: "black", textAlign: "center" }}>Semester&nbsp;&nbsp; <span className="text-danger">*</span></p>
                            </div>
                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "bold", color: "black" }}>Installment Amount&nbsp;&nbsp; <span className="text-danger">*</span></p>
                            </div>
                            <div className='col-lg-3'>
                                <p style={{ fontWeight: "bold", color: "black" }}>Month&nbsp;&nbsp; <span className="text-danger">*</span></p>
                            </div>
                            <div className='col-lg-2'>
                                <p style={{ fontWeight: "bold", color: "black" }}>Academic Year&nbsp;&nbsp; <span className="text-danger">*</span></p>
                            </div>
                            <div className='col-lg-1'>
                                {/* <p style={{ fontWeight: "bold", color: "black" }}>Status</p> */}
                            </div>
                            <div className='col-lg-2'>

                            </div>
                        </div>

                        {fees.map((fee, index) => {
                            return <div className='row' key={index}>

                                <div className='col-lg-2'>
                                    <p style={{ color: "black", textAlign: "center" }}>{fee.semester}</p>
                                </div>
                                <div className='col-lg-2'>
                                    <p style={{ color: "black" }}>{fee.amount}</p>
                                </div>
                                <div className='col-lg-3'>
                                    <p style={{ color: "black" }}>{getMonthFormat(fee.ins_month)}</p>
                                </div>
                                <div className='col-lg-2'>
                                    <p style={{ color: "black" }}>{fee.academic_year}</p>
                                </div>
                                <div className='col-lg-1'>

                                </div>
                                <div className='col-lg-2'>

                                </div>
                            </div>
                        })}

                        {inputs.map((input, index) => (
                            <div key={index} className='clgname'>
                                <div className='row' style={{ justifyContent: "center", alignItems: "center" }}>
                                    <div className='col-lg-2'>
                                        {/* <input
                                            type="text" className='form-control'
                                            value={input.semester}
                                            placeholder='Enter Semester'
                                            disabled={isLoading}
                                            onChange={(e) => handleInputChange(index, 'semester', e.target.value)}
                                        /> */}
                                        {/* <p style={{ textAlign: "center" }}>Semester-{fees.length + index + 1}</p> */}

                                        <select className="form-select" aria-label="Default select example" value={input.semester} onChange={(e) => handleInputChange(index, 'semester', e.target.value)}>
                                            <option defaultValue>Select Semester</option>
                                            {semester()}
                                        </select>

                                    </div>

                                    <div className='col-lg-2'>
                                        <input
                                            type="number" className='form-control'
                                            value={input.amount}
                                            placeholder='Enter Amount'
                                            disabled={isLoading}
                                            onChange={(e) => { handleInputChange(index, 'amount', e.target.value) }}
                                        />
                                    </div>

                                    <div className='col-lg-3'>
                                        <input
                                            type="month" className='form-control'

                                            ref={(el) => (inputRef.current[1] = el)}
                                            name='cmail'
                                            disabled={isLoading}
                                            // placeholder='Enter college Email'
                                            onChange={(e) => handleInputChange(index, 'month', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                        />
                                    </div>
                                    <div className='col-lg-2'>
                                        <select className="form-select" aria-label="Default select example" value={input.year} onChange={(e) => handleInputChange(index, 'year', e.target.value)}>
                                            <option defaultValue>Select Year</option>
                                            {academicYear()}
                                        </select>
                                    </div>

                                    <div className='col-lg-1' style={{ textAlign: "center", width: "11.5%" }}>
                                        {/* <button className='btn btn-primary mail-button' disabled={isLoading} onClick={() => {
                                            handleSendMail(input.collegeEmail, input.collegeName, input.comments, index);
                                        }}>Send Mail</button> */}

                                    </div>

                                    <div className='col-lg-1' style={{ textAlign: "center", width: "13.5%", display: "flex", justifyContent: "space-between" }}>
                                        {index === inputs.length - 1 && (
                                            <>

                                                <button className='btn btn-primary mail-button' disabled={isLoading} onClick={handleAddInput}>Add</button>
                                                {index !== 0 &&
                                                    <button className='btn btn-danger mail-button' disabled={isLoading} onClick={() => handleRemoveInput(index)}>Remove</button>
                                                }
                                            </>
                                        )}
                                        {index !== inputs.length - 1 && (
                                            // <i className="ri-indeterminate-circle-line" disabled={isLoading} onClick={() => handleRemoveInput(index)}></i>
                                            <button className='btn btn-danger mail-button' disabled={isLoading} onClick={() => handleRemoveInput(index)}>Remove</button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                        <hr />

                        <div style={{ display: "flex", justifyContent: "end", marginTop: "2em" }}>

                            <button type="button" class="btn btn-danger mail-button" style={{ marginRight: "15px" }} onClick={() => { setInputs([{ amount: null, month: null, year: '' }]); dispatch(setFeesModal(false)); }}>Cancel</button>

                            <button type="button" class="btn btn-success mail-button" disabled={isLoading} style={{ marginRight: "15px" }} onClick={handleSubmit}>Submit</button>

                        </div>

                    </div >

                </div>
            }
        </React.Fragment>
    )
}

export default StudentFeesModal;
