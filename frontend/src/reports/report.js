import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import ipAddress from '../ipconfig';
import "../index.css";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import FundsModal from '../bootstrapcomp/fundsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCsrMdComment, setShowFundModal } from '../actions/interviewtime';
import CommentsModal from '../bootstrapcomp/commentsModal';
import { generatePDF } from '../pdf/pdf';
import { showtime } from '../pdf/showInterviewtime';
import { capitalName } from '../components/capitalName';

const Report = (props) => {

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

    const Api = props.api;
    const ReportName = props.rName;
    const pdfHeading = props.pdfhead;
    const tableColumn = props.tablecol;
    const tabledata = props.tableData;
    const codeNo = props.code;
    const btndate = props.btn;

    console.log(tabledata);

    function getFormattedMonthFromDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        const formattedMonth = date.toLocaleString('en-US', options);
        return formattedMonth;
    }

    // function showtime(time_string) {
    //     const time = parseInt(time_string, 10);
    //     if (time === 0) {
    //         return 'Not Selected'
    //     }
    //     else if (time === 1) {
    //         return '10 am - 11 am'
    //     }
    //     else if (time === 2) {
    //         return '11 am - 12 pm'
    //     }
    //     else if (time === 3) {
    //         return '12 pm - 1 pm'
    //     }
    //     else if (time === 4) {
    //         return '1 pm - 2 pm'
    //     }
    //     else if (time === 5) {
    //         return '3 pm - 4 pm'
    //     }
    //     else if (time === 6) {
    //         return '4 pm - 5 pm'
    //     }
    // }

    const date = new Date();
    const getfulldate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const showfundmodal = useSelector((state) => state.interview.showfundmodal);
    // const showcsrmdcomment = useSelector((state) => state.interview.showcsrmdcomment);
    // const fetchdata = useSelector((state) => state.interview.fetchdata);

    console.log(showfundmodal);
    console.log("pdf generated", pdfGenerated);

    async function getMdApproval(mode, fdate, tdate, callback) {
        setIsLoading(true);
        const response = await fetch(`http://${ipAddress}:8000/${Api}?dbmode=${mode}&fromdate=${fdate}&todate=${tdate}`).then(res => res.json()).then((res) => setStudents(res));
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
                await getMdApproval(codeNo === 4? 3 : 1, fromdate, currentDate);
            }
            else if (fdate !== '2000-1-1' && tdate === '2000-1-1') {
                console.log("calling 2");
                console.log(fromdate, todate, dbmode);
                await getMdApproval(codeNo === 4 ? 4 : 2, fromdate, currentDate);
            }
            else if (fdate === '2000-1-1' && tdate !== '2000-1-1') {
                console.log("calling 3");
                console.log(fromdate, todate, dbmode);
                await getMdApproval(codeNo === 4 ? 4 : 2, fromdate, todate);
            }
            else {
                console.log("calling 4");
                console.log(fromdate, todate, dbmode);
                await getMdApproval(codeNo === 4 ? 4 : 2, fromdate, todate);

            }
            if (ispdf === 1) {
                setPdfGenerated(true);
            }
        }
    }


    const data = {
        columns: tableColumn,

        rows: students.map((student, index) => ({
            name: <p style={{ fontSize: "14px", marginBottom: 0 }}>{capitalName(student[tabledata[0]])}</p>,
            college: <p style={{ width: "300px", fontSize: "14px", marginBottom: 0 }}>{student[tabledata[1]]}</p>,
            phone: <p style={{ width: "100%", fontSize: "14px" }}>{codeNo === 3 ? new Date(student[tabledata[2]]).toLocaleDateString() : btndate === 1 ? new Date(student[tabledata[2]]).toLocaleDateString() : student[tabledata[2]]}</p>,
            approve: <span class={codeNo === 3 ? "text-dark" : codeNo === 4 ? "text-dark" : codeNo === 5 ? "text-dark" : "badge bg-success"} style={{ color: "white" }}>{codeNo === 1 ? tabledata[3] : codeNo === 3 ? student[tabledata[3]] : codeNo === 4 ? student[tabledata[3]] : new Date(student[tabledata[3]]).toLocaleDateString()}<br /><br />{codeNo === 1 ? "" : codeNo === 3 ? "" : codeNo === 4 ? "" : codeNo === 5 ? "" : showtime(student.slot_id)}
            </span>,
            intname: codeNo === 1 ? "" : codeNo === 3 ? "" : codeNo === 4 ? student[tabledata[4]] : codeNo === 5 ? student[tabledata[4]]: (
                <ul>
                    {student[tabledata[4]].map((intname, index) => (
                        <li style={{ background: index % 2 === 0 ? "#cefaff" : "#87f187", padding: "2px 5px", border: "0.5px solid black" }} key={index}>
                            {intname.firstname} {intname.lastname}
                        </li>
                    ))}
                </ul>
            ),
            month: codeNo === 4 ? <p style={{ fontSize: "14px", marginBottom: 0 }}>{getFormattedMonthFromDate(student[tabledata[5]])}</p> : "",
        })),
    };


    useEffect(() => {
        // getMdApproval(1, fromdate, todate);
        showdata(fromdate, todate, 0);
        if (pdfGenerated) {
            generatePDF(pdfHeading, students, fromdate, todate, tabledata,ReportName, codeNo, btndate);
            setPdfGenerated(false);
        }
    }, [pdfGenerated])

    return (
        <>
            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginTop: "80px" }}>
                    <div class="pagetitle">
                        <h1>Students {ReportName}</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Data Table</a></li>
                                <li class="breadcrumb-item active">{ReportName}</li>
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
                            <div className='col-3' style={{ textAlign: "center" }}>
                                <button className='btn btn-primary mail-button' onClick={() => {
                                    showdata(fromdate, todate, 1);
                                    // setPdfGenerated(true);
                                }}
                                >Report To PDF</button>
                            </div>
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

export default Report
