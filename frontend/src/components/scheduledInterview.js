import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from './sidebar';
import ipAddress from '../ipconfig';
import { showtime } from '../pdf/showInterviewtime';

const ScheduledInterview = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    console.log(students);

    async function fetchstudent(clgId, stuId, dbmode) {

        const data = await fetch(`http://${ipAddress}:8000/users/readyforinterview?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
            setStudents(dataset);
            console.log(dataset);
        });
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

    const navitopdf = async () => {
        navigate("/pdfresume")
    }

    const saveid = async (d) => {
        const sv = localStorage.setItem("studentid", d)
        return sv;
    }

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
            },
            {
                label: 'College',
                field: 'position',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Slot Date',
                field: 'office',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Slot Time',
                field: 'age',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Phone',
                field: 'date',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Resume',
                field: 'salary',
                sort: 'asc',
                width: 100
            }
        ],
        rows: students.map((student, index) => ({
            name: <p style={{ fontSize: "14px" }}>{student.studentname}</p>,
            position: <p style={{ fontSize: "14px" }}>{student.collegename}</p>,
            office: <p style={{ fontSize: "14px" }}>{new Date(student.Slot_date).toLocaleDateString()}</p>,
            age: <p style={{ fontSize: "14px" }}>{showtime(student.slot_id)}</p>,
            date: <p style={{ fontSize: "14px" }}>{student.studentphone}</p>,
            salary: <button className='btn btn-success mail-button' onClick={(e) => { saveid(student.serialno); navitopdf(); }}>Resume</button> // Replace with the correct field for the resume link
        }))
    };

    useEffect(() => {
        fetchstudent(1, 1, 2)
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginTop: "80px" }}>
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={data}
                        noBottomColumns
                    />
                </main>
            </div>
        </>

    );
}

export default ScheduledInterview;