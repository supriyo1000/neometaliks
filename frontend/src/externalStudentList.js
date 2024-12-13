import React,{useEffect, useState} from 'react';
import ipAddress from './ipconfig';
import { MDBDataTable } from 'mdbreact';
import { useSelector,useDispatch } from 'react-redux';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Report from './reports/report';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExternalStudentList = () => {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState(null);
    const [btncode, setBtncode] = useState(null);
    const [dbmode, setDbmode] = useState(1);
    const [fromdate, setFromdate] = useState('2000-1-1');
    const [todate, setTodate] = useState('2000-1-1');
    const [isLoading, setIsLoading] = useState(false);
    const [pdfGenerated, setPdfGenerated] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(students);

    const updatestate = () => {
        setPdfGenerated(!pdfGenerated)
    }

    function showtime(time_string) {
        const time = parseInt(time_string, 10);
        if (time === 0) {
            return 'Not Selected'
        }
        else if (time === 1) {
            return '10 am - 11 am'
        }
        else if (time === 2) {
            return '11 am - 12 pm'
        }
        else if (time === 3) {
            return '12 pm - 1 pm'
        }
        else if (time === 4) {
            return '1 pm - 2 pm'
        }
        else if (time === 5) {
            return '3 pm - 4 pm'
        }
        else if (time === 6) {
            return '4 pm - 5 pm'
        }
    }

    const updateStatus = async (stuid,btncode) => {
        setIsLoading(true);
        const response = await axios.post(`http://${ipAddress}:8000/external/external_student_update`,{stuid : stuid ,status:btncode === 0 ? 2 : 1});
        setIsLoading(false);
        console.log(response);
        updatestate();
        alert(btncode === 1 ? "Candidate Approved Successfully" : "Candidate Rejected")
    }

    const date = new Date();
    const getfulldate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const showfundmodal = useSelector((state) => state.interview.showfundmodal);
    // const showcsrmdcomment = useSelector((state) => state.interview.showcsrmdcomment);
    // const fetchdata = useSelector((state) => state.interview.fetchdata);

    console.log(showfundmodal);
    console.log("pdf generated", pdfGenerated);

    async function getExternalStudent(mode, fdate, tdate) {
        setIsLoading(true);
        const response = await fetch(`http://${ipAddress}:8000/external/external_student_list?dbmode=${mode}&fromdate=${fdate}&todate=${tdate}`).then(res => res.json()).then((res) => setStudents(res));
        setIsLoading(false);
        console.log(response);
    }

    async function showdata(fdate, tdate, ispdf) {
        console.log(fdate, tdate);
        const currentDate = getfulldate;
        if (fdate > tdate) {
            alert('From-Date and To-Date Mismatch');
        } else {
            if (fdate === '2000-1-1' && tdate === '2000-1-1') {
                console.log("calling 1");
                await getExternalStudent(2, fromdate, currentDate);
            }
            else if (fdate !== '2000-1-1' && tdate === '2000-1-1') {
                console.log("calling 2");
                console.log(fromdate, todate, dbmode);
                await getExternalStudent(3, fromdate, currentDate);
            }
            else if (fdate === '2000-1-1' && tdate !== '2000-1-1') {
                console.log("calling 3");
                console.log(fromdate, todate, dbmode);
                await getExternalStudent(3, fromdate, todate);
            }
            else {
                console.log("calling 4");
                console.log(fromdate, todate, dbmode);
                await getExternalStudent(3, fromdate, todate);

            }
            // if (ispdf === 1) {
            //     setPdfGenerated(true);
            // }
        }
    }


    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'College',
                field: 'college',
                sort: 'asc',
                width: 270, // You can remove the 'width' property here
            },
            {
                label: 'Phone',
                field: 'phone',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            },
            {
                label: 'Grade',
                field: 'grade',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            },
            {
                label: 'Marks',
                field: 'marks',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            }, {
                label: 'Referal Person',
                field: 'refp',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            }, {
                label: 'Rejection',
                field: 'rejection',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            },
            {
                label: 'Approval',
                field: 'approve',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
        ],

        rows: students.map((student, index) => ({
            name: <p style={{ fontSize: "14px", marginBottom: 0 }}>{student.name}</p>,
            college: <p style={{ width: "300px", fontSize: "14px", marginBottom: 0 }}>{student.college}</p>,
            phone: <p style={{ width: "100%", fontSize: "14px" }}>{student.phone}</p>,
            grade: <p style={{ width: "100%", fontSize: "14px" }}>{student.grade}</p>,
            marks: <p style={{ width: "100%", fontSize: "14px" }}>{student.marks}</p>,
            refp: <p style={{ width: "100%", fontSize: "14px" }}>{student.ref_person}</p>,
            rejection: <button className='btn btn-danger mail-button' onClick={()=> updateStatus(student.srno, 0)}>Reject</button>,
            approve: <button className='btn btn-success mail-button' onClick={() => updateStatus(student.srno, 1)}>Approve</button>
        })),
    };


    useEffect(() => {
        // getMdApproval(1, fromdate, todate);
        showdata(fromdate, todate, 0);
        // if (pdfGenerated) {
        //     generatePDF(pdfHeading, students, fromdate, todate, tabledata, ReportName, codeNo);
        //     setPdfGenerated(false);
        // }
    }, [pdfGenerated])

    return (
        <>
            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginTop: "80px" }}>
                    <div class="pagetitle">
                        <h1>Referal Candidate Approval</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Data Table</a></li>
                                <li class="breadcrumb-item active">Referal Candidate Approval</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='card' style={{ padding: "20px" }}>
                        <div className='row'>
                            <div className='col-4'>
                                <label style={{ fontWeight: "bold" }}>From Date :&nbsp;&nbsp;</label>
                                <input type='date' onChange={(e) => setFromdate(e.target.value)} />
                            </div>
                            <div className='col-4'>
                                <label style={{ fontWeight: "bold" }}>To Date :&nbsp;&nbsp;</label>
                                <input type='date' onChange={(e) => setTodate(e.target.value)} />
                            </div>
                            <div className='col-1' style={{ textAlign: "center" }}>
                                <button className='btn btn-success mail-button' onClick={() => showdata(fromdate, todate, 0)}>Show</button>
                            </div>
                            {/* <div className='col-3' style={{ textAlign: "center" }}>
                                <button className='btn btn-primary mail-button' onClick={() => {
                                    showdata(fromdate, todate, 1);
                                    // setPdfGenerated(true);
                                }}
                                >Report To PDF</button>
                            </div> */}
                        </div>
                    </div>
                    <div className='card' style={{ padding: "20px" }}>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            data={data}
                            noBottomColumns
                        />
                    </div>
                </main>
            </div>
        </>
    )
}

export default ExternalStudentList;
