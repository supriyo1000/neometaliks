import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './navbar'
import Sidebar from './sidebar';
import "../viewcollege.css";
import Studentbycollegeverification from './studentbycollegeverification';
import { setColor, setModal } from '../actions/mentorActions';
import withAuth from '../withauth';
import ipAddress from '../ipconfig';

const Viewcollege = () => {
    const [colleges, setColleges] = useState([]);
    const [students, setStudents] = useState([]);
    const [coll_ID, setColl_Id] = useState(null);
    const [stu_ID, setStu_Id] = useState(null);
    const [user, setUser] = useState([]);


    const [dis, setDis] = useState(false);

    // console.log(students);
    // console.log(user);

    console.log(colleges);


    const color = useSelector((state) => state.mentor.color);
    console.log("color", color);

    const dispatch = useDispatch();


    async function fetchdata() {
        const data = await fetch(`http://${ipAddress}:8000/users/colleges`).then(res => res.json()).then(dataset => setColleges(dataset));
        return data;
    }

    async function fetchstudent(clgId, stuId, dbmode) {

        const data = await fetch(`http://${ipAddress}:8000/users/getstudentbycollege?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
            stuId === 0 ? setStudents([...dataset]) : setUser([...dataset]);
            console.log("Fetched student data:", dataset);
        });

    }

    useEffect(() => {
        fetchdata();

        // if (color) {
        //     setTimeout(() => {
                fetchstudent(coll_ID, 0, 1);
                console.log(user);
            // }, 500);
            // console.log("color useeffect", color);
            // console.log("students", students);
            // console.log("users", user);
        // }

    }, [color])
    return (
        <>

            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginLeft: "240px" }}>
                    <h3>List Of Student By College</h3>
                    <div style={{ width: "50%", margin: "30px 0" }}>

                        <label id='selectcollege'>Select College</label><br /><br />
                        <select class="form-select" aria-label="Default select example" onChange={(e) => { fetchstudent(e.target.value, 0, 1); setColl_Id(e.target.value) }}>
                            <option selected>Open this select menu</option>
                            {colleges.map((college, index) => {
                                return <option value={college.coll_ID} key={index} >{college.collegename}</option>
                            })}

                        </select>
                    </div>

                    <div className='container mt-5 mb-5 studentview'>
                        <h5>List Of Student Uploaded By College</h5><hr />

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Screening Status</th>
                                    <th scope="col">student Name</th>
                                    <th scope="col">student Phone</th>
                                    <th scope="col">Grade</th>
                                    <th scope="col">Marks</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">view</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {students.map((student, index) => {
                                    return <tr key={index} >
                                        <th scope="row">
                                            <span
                                                className={student.submit_stage === 1 ? "indicator1 --warning" : "indicator --warning"}
                                            ></span>

                                        </th>
                                        <td>{student.studentname}</td>
                                        <td>{student.studentphone}</td>
                                        <td>{student.grade}</td>
                                        <td>{student.studentmarks}</td>
                                        <td>{student.remarks}</td>
                                        <td>
                                            <button class="btn btn-primary" disabled={student.submit_stage === 1} onClick={() => { fetchstudent(coll_ID, student.serialno, 2); setStu_Id(student.serialno);dispatch(setModal(true)) }}>
                                                {student.submit_stage === 1 ? "Verified" : "Verify"}</button>
                                        </td>
                                    
                                    </tr>
                                })} */}
                                {students.map((student, index) => (
                                    student.submit_stage === 0 && (
                                        <tr key={index}>
                                            <th scope="row">
                                                <span
                                                    className={student.submit_stage === 1 ? "indicator1 --warning" : "indicator --warning"}
                                                ></span>
                                            </th>
                                            <td>{student.studentname}</td>
                                            <td>{student.studentphone}</td>
                                            <td>{student.grade}</td>
                                            <td>{student.studentmarks}</td>
                                            <td>{student.remarks}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    disabled={student.submit_stage === 1}
                                                    onClick={() => {
                                                        fetchstudent(coll_ID, student.serialno, 2);
                                                        setStu_Id(student.serialno);
                                                        dispatch(setModal(true));
                                                    }}
                                                >
                                                    {student.submit_stage === 1 ? "Verified" : "Verify"}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))}

                                <Studentbycollegeverification student={user} colId={coll_ID} stuId={stu_ID} />

                            </tbody>
                        </table>
                    </div>


                </main>
            </div>

        </>
    )
}

export default withAuth(Viewcollege);