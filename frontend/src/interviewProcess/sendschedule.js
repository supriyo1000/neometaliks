import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import "../viewcollege.css";
import Studentbycollegeverification from '../components/studentbycollegeverification';
import { setColor, setModal } from '../actions/mentorActions';
import axios from 'axios';
import Interviewmodal from '../bootstrapcomp/interviewmodal';
import { setFirst, setInterviewDate, setViewModal } from '../actions/interviewtime';
import ipAddress from '../ipconfig';
import { showtime } from '../pdf/showInterviewtime';

const Sendschedule = () => {

    const dispatch = useDispatch();

    const [colleges, setColleges] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectstud, setSelectstud] = useState([]);
    const [selectstudent, setSelectstudent] = useState(null);
    const [coll_ID, setColl_Id] = useState(null);
    const [rol, setRol] = useState(null);
    const [person, setPerson] = useState(null);
    // const [date, setDate] = useState(null);
    const [intw, setIntw] = useState([]);
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const viewmodal = useSelector((state) => state.interview.modal);
    const first = useSelector((state) => state.interview.first);
    const interviewdate = useSelector((state) => state.interview.interviewdate);

    // console.log(viewmodal);
    // console.log(selectstudent);

    console.log(colleges);
    console.log(coll_ID);

    // console.log("selected student", selectstud);
    console.log("Fetched student data:", students);
    // console.log("role id", roleId);
    // console.log("person id", person);


    // const color = useSelector((state) => state.mentor.color);
    // console.log("color", color);

    // const dispatch = useDispatch();

    const date = new Date();
    const todaydate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}}`;



    async function fetchuserdetail(id) {
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchuserdetails?roleid=${id}`);
            setRol(response.data[0].roleId);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchdata() {
        const data = await fetch(`http://${ipAddress}:8000/users/colleges`).then(res => res.json()).then(dataset => setColleges(dataset));
        // return data;
    }

    const userid = localStorage.getItem("processNo");
    // async function fetchstudent(clgId, stuId, dbmode) {

    //     const data = await fetch(`http://localhost:8000/users/getstudentbycollege?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
    //         stuId === 0 ? setStudents([...dataset]) : setUser([...dataset]);
    //         console.log("Fetched student data:", dataset);
    //     });

    // }

    async function fetchstudent(clgId, stuId, dbmode) {

        const data = await fetch(`http://${ipAddress}:8000/users/readyforinterview?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
            setStudents(dataset);

        });

    }

    const handleCheckboxChange = (serialno) => {
        const isSelected = selectstud.includes(serialno);
        if (!isSelected) {
            setSelectstud([...selectstud, serialno]);
        } else {
            const updatedSelectstud = selectstud.filter((item) => item !== serialno);
            setSelectstud(updatedSelectstud);
        }
    };

    function getUserId() {
        const response = localStorage.getItem('userid')
        return response;
    }

    async function fetchRole() {
        try {
            const response = await axios.get('http://localhost:8000/users/fetchrole');
            const data = response.data;
            console.log(data);
            setRoles(data);
            console.log('Data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    }
    // console.log("roleid", roleId);
    // console.log("intw", intw);

    async function fetchCoordinator() {

        const res = await fetch(`http://localhost:8000/users/fetchSelectedUsers?dbmode=${1}&roleid=${roleId}`).then(res => res.json()).then(res => setIntw(res))
        console.log("intw", intw);


    }
    async function fetchUsers() {

        const res = await fetch(`http://${ipAddress}:8000/fetch_all_users_role`).then(res => res.json());
        setUsers(res);
        console.log(users);


    }

    const handleRoleChange = (event) => {
        const selectedRoleId = event.target.value;
        console.log('Selected Role ID:', selectedRoleId);
        setRoleId(selectedRoleId);
    };

    const handleUserChange = (event) => {
        const selectedRoleId = event.target.value;
        console.log('Selected Role ID:', selectedRoleId);
        setPerson(selectedRoleId);
    };

    async function submitData() {

        setIsLoading(true);
        const response = await axios.post(`http://${ipAddress}:8000/users/Interview_Schedule`, {
            mode: 1, stuid: selectstudent, colid: coll_ID, slot_id: first, slot_date: interviewdate, slot_time: null, panelid: selectstud, co_id: userid
        })
        setIsLoading(false);
        console.log(response.data);
        alert("Interview Has Been Scheduled Successfully !!");
        fetchstudent(coll_ID, 0, 1);
        setSelectstud([]);
        dispatch(setFirst(0));
        dispatch(setInterviewDate(''));
    }

    // function showtime(time_string) {
    //     const time = parseInt(time_string, 10);
    //     if (time === 0) {
    //         return <span>Not Selected</span>
    //     }
    //     else if (time === 1) {
    //         return '10 am - 11 am'
    //     }
    //     else if (time === 2) {
    //         return <span>11 am - 12 pm</span>
    //     }
    //     else if (time === 3) {
    //         return <span>12 pm - 1 pm</span>
    //     }
    //     else if (time === 4) {
    //         return <span>1 pm - 2 pm</span>
    //     }
    //     else if (time === 5) {
    //         return <span>3 pm - 4 pm</span>
    //     }
    //     else if (time === 6) {
    //         return <span>4 pm - 5 pm</span>
    //     }
    // }

    // function showtime(time_string) {
    //     const time = parseInt(time_string, 10);
    //     if (time === 0) {
    //         return "Not Selected";
    //     }else if (time === 1) {
    //         return "8.30 am - 9.00 am";
    //     } else if (time >= 2 && time <= 29) {
    //         const startTimeHour = Math.floor(time / 2) + 8;
    //         const startTimeMinute = (time % 2) * 30;
    //         const endTimeHour = Math.floor((time + 1) / 2) + 8;
    //         const endTimeMinute = ((time + 1) % 2) * 30;

    //         console.log(typeof(startTimeHour));
    //         console.log(endTimeHour);

    //         const startTimeString = `${startTimeHour.toString().padStart(2, '0')}:${startTimeMinute.toString().padStart(2, '0')}`;
    //         const endTimeString = `${endTimeHour.toString().padStart(2, '0')}:${endTimeMinute.toString().padStart(2, '0')}`;

    //         return `${startTimeString} ${startTimeHour >= 12 ? "pm" : "am"} - ${endTimeString} ${endTimeHour >= 12 ? "pm" : "am"}`;
    //     } else {
    //         return "Invalid Parameter";
    //     }
    // }

    useEffect(() => {
        fetchdata();
        fetchuserdetail(getUserId());
        fetchUsers();
        // if (color) {
        //     setTimeout(() => {
        //         fetchstudent(coll_ID, 0, 1);
        //         console.log(user);
        //     }, 500);
        //     // console.log("color useeffect", color);
        //     // console.log("students", students);
        //     // console.log("users", user);
        // }

    }, [])

    return (
        <>
            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginTop: "80px" }}>
                    {/* <div className='overlay'> */}
                    {isLoading && (
                        <div className="loading-container" style={{ zIndex: "1" }}>
                            <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                        </div>
                    )}
                    {/* </div> */}

                    <div class="pagetitle">
                        <h1>Send Interview Mail</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <section class="section dashboard">
                        <div class="row">

                            {/* <!-- Left side columns --> */}
                            <div class="col-8">
                                <div class="row">

                                    {/* <!-- Customers Card --> */}
                                    <div class="col-12">

                                        <div class="card info-card customers-card">

                                            <div class="card-body">
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <h5 class="card-title">Select College</h5>
                                                    </div>
                                                    <div className='col-6' style={{ fontSize: "14px", padding: "10px" }}>
                                                        <strong>Interview Date</strong> : {interviewdate === '' ? "Not Selected" : interviewdate}<br />
                                                        <strong>Interview Time</strong> : {showtime(first)}
                                                    </div>
                                                </div>


                                                <div className='row'>
                                                    <div className='col-8'>
                                                        <div class="d-flex align-items-center">
                                                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-house-fill"></i>
                                                            </div>
                                                            <div class="ps-3">
                                                                <select class="form-select" aria-label="Default select example" onChange={(e) => { fetchstudent(e.target.value, 0, 1); setColl_Id(e.target.value) }}>
                                                                    <option selected>Open this select menu</option>
                                                                    {colleges.map((college, index) => {
                                                                        return <option value={college.coll_ID} key={index} >{college.collegename}</option>
                                                                    })}

                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-4 ' style={{ alignSelf: "center" }}>
                                                        <button className='btn btn-primary' disabled={isLoading} onClick={() => dispatch(setViewModal(true))}>Select Schedule</button>
                                                    </div>
                                                </div>
                                                {viewmodal && <Interviewmodal />}
                                            </div>
                                        </div>

                                    </div>
                                    {/* <!-- End Customers Card --> */}


                                    <div class="col-12">
                                        <div class="card recent-sales overflow-auto">

                                            <div class="card-body">
                                                <h5 class="card-title">List Of Student</h5>

                                                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">

                                                    <div class="dataTable-container">
                                                        <table class="table table-borderless datatable dataTable-table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" data-sortable="" style={{ width: "24.0072%" }}>
                                                                        student Name</th>
                                                                    <th scope="col" data-sortable="" style={{ width: "24.0072%" }}>student Phone</th>
                                                                    <th scope="col" data-sortable="" style={{ width: "9.9278%" }}>Grade</th>
                                                                    <th scope="col" data-sortable="" style={{ width: "9.9278%" }}>Marks</th>
                                                                    <th scope="col" data-sortable="" style={{ width: "15.1625%" }}>Status</th>
                                                                    <th scope="col" data-sortable="" style={{ width: "9.9278%" }}>Select</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {students.map((student, index) => (
                                                                    student.submit_stage === 2 && (
                                                                        <tr key={index}>
                                                                            <td>{student.studentname}</td>
                                                                            <td>{student.studentphone}</td>
                                                                            <td>{student.grade}</td>
                                                                            <td>{student.studentmarks}</td>
                                                                            <td>
                                                                                <span class="badge bg-success">{student.final_approved_status === 1 ? "Approved" : "Not Approved"}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div class="form-check">
                                                                                    <input class="form-check-input" type="radio"
                                                                                        name="selectedStudent" value={student.serialno} id="flexCheckChecked"
                                                                                        onChange={(e) => setSelectstudent(e.target.value)}
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "end" }}>
                                        {/* <button type="button" class="btn btn-danger">Cancel</button> */}
                                        <button type="button" class="btn btn-primary" disabled={isLoading || selectstud.length === 0 || coll_ID === null || selectstudent === null || interviewdate === "" || first === null} onClick={submitData}>Submit</button>
                                    </div>

                                </div>
                            </div>

                            <div class="col-lg-4">

                                {/* <!-- Recent Activity --> */}
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title"> Active Users</h5>

                                        <div class="activity">
                                            <table class="table table-warning table-striped">
                                                <tbody>
                                                    {users.map((user, index) => {
                                                        return <tr key={index}>
                                                            <th scope="row">
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                                                        onChange={() => handleCheckboxChange(user.userId)}
                                                                        checked={selectstud.includes(user.userId)}
                                                                    />
                                                                </div>
                                                            </th>
                                                            <td>{user.firstname} {user.lastname}</td>
                                                            <td><li style={{
                                                                background: "rgb(255 218 197)",
                                                                textAlign: "center", border: "1px solid #bfbaba"
                                                            }}>{user.userRole}</li>
                                                                {user.assignedRoles.map((role, index) => {
                                                                    const background = index % 2 === 0 ? "rgb(251 219 255)" : "rgb(218 255 218)";
                                                                    return <li style={{ background, textAlign: "center", border: "0.5px solid #bfbaba" }} key={index}>{role}</li>
                                                                })}</td>

                                                        </tr>
                                                    })}

                                                </tbody>
                                            </table>
                                            {/* //  return   <div className='row' key={index}>
                                            //         <div className='col-1'>
                                            //             <input type='radio' />
                                            //         </div>
                                            //         <div className='col-6'>
                                            //          {user.firstname} {user.lastname}
                                            //         </div>
                                            //         <div className='col-5'>
                                            //          <ul>
                                            //              <li>{user.userRole}</li>
                                                        //  {user.assignedRoles.map((role,index) => {
                                                        //      return <li key={index}>{role}</li> 
                                                        //  })}
                                            //             </ul>
                                            //         </div>
                                            //     </div> */}


                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>




                    {/* <div><h3>Send Interview Mail</h3></div>

                    <label id='selectcollege'>Select College</label><br /><br />
                    <select class="form-select" aria-label="Default select example" onChange={(e) => { fetchstudent(e.target.value, 0, 1); setColl_Id(e.target.value) }}>
                        <option selected>Open this select menu</option>
                        {colleges.map((college, index) => {
                            return <option value={college.Coll_ID} key={index} >{college.collegename}</option>
                        })}

                    </select>

                    <div className='container mt-5 mb-5'>
                        <h4>List Of Student</h4><hr />

                        <table class="table table-primary table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">student Name</th>
                                    <th scope="col">student Phone</th>
                                    <th scope="col">Grade</th>
                                    <th scope="col">Marks</th>
                                    <th scope="col">Approval Status</th>
                                    <th scope="col">Select Student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    student.submit_stage === 0 && (
                                        <tr key={index}>
                                            <td>{student.studentname}</td>
                                            <td>{student.studentphone}</td>
                                            <td>{student.grade}</td>
                                            <td>{student.studentmarks}</td>
                                            <td>{student.final_approved_status === 1 ? "Approved" : "Not Approved"}</td>
                                            <td>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                                        onChange={() => handleCheckboxChange(student.serialno)}
                                                        checked={selectstud.includes(student.serialno)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ))}


                            </tbody>
                        </table>

                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Select Role</label>
                                <select class="form-select" aria-label="Default select example" value={roleId}
                                    onChange={handleRoleChange} onClick={fetchRole}>
                                    <option value={""} selected>Select Role</option>
                                    {roles.map((role, index) => {
                                        return <option value={role.roleId} key={role.roleId}>{role.roleName}</option>
                                    })

                                    }
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <label>Select Person</label>
                                <select class="form-select" aria-label="Default select example" onClick={fetchCoordinator} onChange={handleUserChange} value={person}>
                                    <option selected>Open this select menu</option>
                                    {intw.map((int, index) => {
                                        return <option value={int.userId} key={index} >{int.userEmail}</option>
                                    })}

                                </select>
                            </div>
                        </div>

                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="button" class="btn btn-danger" onClick={() => {
                            // dispatch(setModal(false));
                            // dispatch(setName(null));
                            // dispatch(setPhone(null));
                            // dispatch(setGrade(null));
                            // dispatch(setMarks(null));
                            // dispatch(setEmailstatus(null));
                        }}>Cancel</button>
                        <button type="button" class="btn btn-primary" onClick={submitData}>Submit</button>
                    </div> */}


                    {/* </div> */}


                </main>
            </div >
        </>
    )
}

export default Sendschedule;