import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import "./journeyStatus.css";
import ipAddress from '../ipconfig';

const JourneyStatus = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState({});

    console.log(students);

    const stuid = localStorage.getItem("Sp");

    async function fetchstudent(clgId, stuId, dbmode) {

        const data = await fetch(`http://${ipAddress}:8000/journeyStatus?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
            setStudents(dataset);
            // console.log(data);
        });

    }

    const formattedDate = (dates) => {
        if (dates === "NA") {
            return dates;
        } else {
            return new Date(dates).toLocaleDateString();
        }
    }

    useEffect(() => {
        fetchstudent(1, stuid, 0)
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
                        <h1>Students Journey</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <section class="section dashboard">
                        <section style={{ backgroundColor: '#eee' }}>
                            <div className="container py-5 h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col">
                                        <div className="card card-stepper" style={{ borderRadius: '10px' }}>
                                            <div className="card-body p-4">

                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-column">
                                                        <span className="lead fw-normal">
                                                            {Object.keys(students).length === 0 ? "Initial Screening Not Complete Yet" : students.studentname}</span>
                                                        {/* <span className="text-muted small">by DHFL on 21 Jan, 2020</span> */}
                                                    </div>
                                                    {/* <div>
                                                        <button className="btn btn-outline-primary" type="button">Track order details</button>
                                                    </div> */}
                                                </div>
                                                <hr className="my-4" />

                                                

                                                {Object.keys(students).length !== 0 ? (<div className="d-flex flex-row justify-content-between align-items-center align-content-center">

                                                    <span className="d-flex justify-content-center align-items-center big-dot dot">
                                                        <i className="fa fa-check text-white"></i>
                                                    </span>

                                                    <hr className="flex-fill track-line" style={{
                                                        backgroundColor:
                                                            students.sStatus === 0
                                                                ? "grey" : "#488978",
                                                    }}></hr>

                                                    <span className="d-flex justify-content-center align-items-center big-dot dot" style={{
                                                        backgroundColor:
                                                            students.sStatus === 0
                                                                ? "grey"
                                                                : students.sStatus === 2
                                                                    ? "#bb2020"
                                                                    : "#488978",
                                                    }}>
                                                        {students.sStatus === 2 ? <i className="bi bi-x-lg text-white"></i> : <i className="fa fa-check text-white"></i>}
                                                    </span>

                                                    <hr className="flex-fill track-line" style={{ backgroundColor: students.intsStatus === 0 ? "#7d8985" : "#488978" }}></hr>

                                                    <span className="d-flex justify-content-center align-items-center big-dot dot" style={{ backgroundColor: students.intsStatus === 2 ? "#bb2020" : students.intsStatus === 1 ? "#488978" : "#7d8985" }}>
                                                        {students.intsStatus === 2 ? <i className="bi bi-x-lg text-white"></i> : <i className="fa fa-check text-white"></i>}</span>
                                                    
                                                    <hr className="flex-fill track-line" style={{ backgroundColor: students.intsStatus === 0 ? "#7d8985" : "#488978" }}></hr>

                                                    <span className="d-flex justify-content-center align-items-center big-dot dot" style={{ backgroundColor: students.intsStatus === 2 ? "#bb2020" : students.intsStatus === 1 ? "#488978" : "#7d8985" }}>
                                                        {students.intsStatus === 2 ? <i className="bi bi-x-lg text-white"></i> : <i className="fa fa-check text-white"></i>}</span>
                                                    
                                                    <hr className="flex-fill track-line" style={{ backgroundColor: students.intStatus === 3 || students.intStatus === 2 || students.intStatus === 10 || students.intStatus === 11 ? "#488978":"#7d8985" }}></hr>
                                                    
                                                    <span className="d-flex justify-content-center align-items-center big-dot dot" style={{ backgroundColor: students.intStatus === 0 ? "#7d8985" : students.intStatus === 3 || students.intStatus === 2 ? "#488978" : "#bb2020" }}>
                                                        {students.intStatus === 10 || students.intStatus=== 11 ? <i className="bi bi-x-lg text-white"></i> : <i className="fa fa-check text-white"></i>}
                                                    </span>

                                                    <hr className="flex-fill track-line" style={{ backgroundColor: students.mdStatus === 0 ? "#7d8985" : "#488978" }}></hr>
                                                    
                                                    <span className="d-flex justify-content-center align-items-center big-dot dot" style={{ backgroundColor: students.mdStatus === 0 ? "#7d8985" : students.mdStatus === 1 ? "#488978" : "#bb2020" }}>
                                                        {students.mdStatus === 2 ? <i className="bi bi-x-lg text-white"></i> : <i className="fa fa-check text-white"></i>}
                                                    </span>

                                                    <hr className="flex-fill track-line" style={{ backgroundColor: students.mdStatus === 0 ? "#7d8985" : "#488978" }}></hr>
                                                    
                                                    <span className="d-flex justify-content-center align-items-center big-dot dot" style={{ backgroundColor: students.mdStatus === 0 ? "#7d8985" : students.mdStatus === 1 ? "#488978" : "#bb2020" }}>
                                                        {students.mdStatus === 2 ? <i className="bi bi-x-lg text-white"></i> : <i className="fa fa-check text-white"></i>}
                                                    </span>
                                                </div> ): ""}

                                                {Object.keys(students).length !== 0 ? (<div className="d-flex flex-row justify-content-between align-items-center">
                                                    <div className="d-flex flex-column align-items-start text_color"><span>{formattedDate(students.inisDate)}</span><span>Initial Screening</span>
                                                    </div>

                                                    <div className="d-flex flex-column justify-content-center text_color"><span>{formattedDate(students.secdate)}</span><span>2nd Approval</span></div>

                                                    <div className="d-flex flex-column justify-content-center align-items- text_color"><span>{formattedDate(students.intschdate)}</span><span>Interview Scheduled</span></div>

                                                    <div className="d-flex flex-column align-items-center text_color"><span>{formattedDate(students.intDate)}</span><span>Interview Date</span></div>

                                                    <div className="d-flex flex-column align-items-end text_color"><span className='intstatus' style={{ width: "100%", textAlign: "center" }}>{students.intStatus === 3 || students.intStatus === 2 ? "Pass" : students.intStatus === 10 ? "Fail" : students.intStatus === 11 ? "Not Appread": "NA"}</span><span>Interview Status</span></div>

                                                    <div className="d-flex flex-column align-items-end text_color"><span>{formattedDate(students.mdDate)}</span><span>MD Approval</span>
                                                    </div>

                                                    <div className="d-flex flex-column align-items-end text_color"><span>{formattedDate(students.mdDate)}</span><span>Fund Allocated</span>
                                                    </div>

                                                </div>) : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>

                </main>
            </div>
        </>
    )
}

export default JourneyStatus
