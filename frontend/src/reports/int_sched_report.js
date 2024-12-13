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

const IntSchedReport = (props) => {
    const [students, setStudents] = useState({});
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
                await getMdApproval(1, fromdate, currentDate);
            }
            else if (fdate !== '2000-1-1' && tdate === '2000-1-1') {
                console.log("calling 2");
                console.log(fromdate, todate, dbmode);
                await getMdApproval(2, fromdate, currentDate);
            }
            else if (fdate === '2000-1-1' && tdate !== '2000-1-1') {
                console.log("calling 3");
                console.log(fromdate, todate, dbmode);
                await getMdApproval(2, fromdate, todate);
            }
            else {
                console.log("calling 4");
                console.log(fromdate, todate, dbmode);
                await getMdApproval(2, fromdate, todate);

            }
            if (ispdf === 1) {
                setPdfGenerated(true);
            }
        }
    }


    const data = {
        columns: tableColumn,

        rows: students.map((student, index) => ({
             name: <p style={{ fontSize: "14px", marginBottom: 0 }}>{student.studentname}</p>,
             college: <p style={{ width: "300px", fontSize: "14px", marginBottom: 0 }}>{student.studentname}</p>,
             phone: <p style={{ width: "100%", fontSize: "14px" }}>{student.studentname}</p>,
             approve: <span class="badge bg-success" style={{ color: "white" }}>{tabledata[3]}</span>,
            })),
        
    };


    useEffect(() => {
        // getMdApproval(1, fromdate, todate);
        showdata(fromdate, todate, 0);
        if (pdfGenerated) {
            generatePDF(pdfHeading, students, fromdate, todate, tabledata, 'Students-ready-For-Funds');
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

export default IntSchedReport;