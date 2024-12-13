import React, { useEffect, useRef, useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import ipAddress from '../ipconfig';
import ReactToPrint from 'react-to-print';

const Showresult = () => {
    const [student, setStudent] = useState([]);

    console.log(student);

    const studentid = localStorage.getItem('studentid');
    const semester = localStorage.getItem('class');
    const resultPdfRef = useRef();

    async function fetchstudent(stuid, sem) {

        const data = await fetch(`http://${ipAddress}:8002/images/get_student_result_file?stuid=${stuid}&semester=${sem}`).then(res => res.json()).then(dataset => {
            setStudent(dataset);
            console.log(dataset);
        });
    }

    useEffect(() => {
        if (studentid && semester) {
            fetchstudent(studentid, semester);
        };
    }, []);

    return (
        <>
            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginTop: "80px" }}>
                    <div class="pagetitle">
                        <h1>Student Result</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Result</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "end",
                        margin: "65px 65px 0 0"
                    }}>
                        <ReactToPrint
                            trigger={() => <button className="btn btn-primary mail-button">Generate PDF</button>}
                            content={() => resultPdfRef.current}
                        />
                    </div>

                    <div ref={resultPdfRef} style={{ padding: "1.5rem" }}>
                        {student && student[0] && <img src={`http://${ipAddress}:8002/uploads/${student[0].result_file}`} alt='img1' />}
                    </div>

                </main>
            </div>
        </>
    )
}

export default Showresult