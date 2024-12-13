import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ipAddress from './ipconfig';
import "./index.css";
import FundsModal from './bootstrapcomp/fundsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCsrMdComment, setShowFundModal } from './actions/interviewtime';
import CommentsModal from './bootstrapcomp/commentsModal';

const CsrApproval = () => {

    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState(null);
    const [details, setDetails] = useState({});
    const [btncode, setBtncode] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(students);

    const showfundmodal = useSelector((state) => state.interview.showfundmodal);
    const showcsrmdcomment = useSelector((state) => state.interview.showcsrmdcomment);
    const fetchdata = useSelector((state) => state.interview.fetchdata);

    console.log(showfundmodal);

    function detailsSetup(stuname, clgname, stumail, clgmail) {
        return setDetails({
            studentname: stuname,
            collegename: clgname,
            stuEmail: stumail,
            clgMail: clgmail
        })
    }

    async function getCsrApproval() {
        const response = await fetch(`http://${ipAddress}:8000/interview/get_csr_approval`).then(res => res.json());
        setStudents(response);
        console.log(response);
    }

    // const data = {

    //     columns: [
    //         {
    //             label: 'Name',
    //             field: 'name',
    //             sort: 'asc',
    //             width: 150
    //         },
    //         {
    //             label: 'College',
    //             field: 'position',
    //             sort: 'asc',
    //             width: 270
    //         },
    //         {
    //             label: 'Interview Held',
    //             field: 'interviewheld',
    //             sort: 'asc',
    //             width: 200
    //         },
    //         {
    //             label: 'Feedbacks',
    //             field: 'feedbacks',
    //             sort: 'asc',
    //             width: 100
    //         },
    //         {
    //             label: 'Approve',
    //             field: 'approve',
    //             sort: 'asc',
    //             width: 150
    //         },
    //         {
    //             label: 'Reject',
    //             field: 'reject',
    //             sort: 'asc',
    //             width: 100
    //         }
    //     ],
    //     rows: students.map((student, index) => ({
    //         name: student.studentname,
    //         position: student.collegename,
    //         interviewheld: new Date(student.Slot_date).toLocaleDateString(),
    //         feedbacks: <button className='btn btn-success mail-button'>Feedbacks</button>,
    //         approve: <button className='btn btn-success mail-button'>Approve</button>,
    //         reject:< button className = 'btn btn-success mail-button' > Reject</button >
    //     }))
    // };

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
                label: 'Interview Held',
                field: 'interviewheld',
                sort: 'asc',
                width: 200, // You can remove the 'width' property here
            },
            {
                label: 'Feedbacks',
                field: 'feedbacks',
                sort: 'asc',
                width: 100, // You can remove the 'width' property here
            },
            {
                label: 'Approve',
                field: 'approve',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            },
            {
                label: 'Reject',
                field: 'reject',
                sort: 'asc',
                className: 'col-reject',
                style: { background: "red" }, // You can remove the 'width' property here
            },
        ],

        rows: students.map((student, index) => ({
            name: <p style={{ fontSize: "14px", marginBottom: 0 }}>{student.studentname}</p>,
            college: <p style={{ width: "300px", fontSize: "14px", marginBottom: 0 }}>{student.collegename}</p>,
            interviewheld: <p style={{ width: "100%", fontSize: "14px" }}>{new Date(student.Slot_date).toLocaleDateString()}</p>,
            feedbacks: <button className='btn btn-primary mail-button' style={{ width: "100%" }}
                onClick={(e) => {
                    setStudentId(student.Student_id);
                    detailsSetup(student.studentname, student.collegename, student.email, student.collegeemail);
                    dispatch(setShowFundModal(true));
                }}
            >Feedbacks</button>,
            approve: <button className='btn btn-success mail-button' style={{ width: "100%" }} onClick={(e) => {
                setStudentId(student.Student_id);
                detailsSetup(student.studentname, student.collegename, student.email, student.collegeemail);
                setBtncode(1);
                dispatch(setShowCsrMdComment(true))
            }}>Approve</button>,
            reject: <button className='btn btn-danger mail-button' style={{ width: "100%" }} onClick={(e) => {
                setStudentId(student.Student_id);
                detailsSetup(student.studentname, student.collegename, student.email, student.collegeemail);
                setBtncode(0);
                dispatch(setShowCsrMdComment(true))
            }}>Reject</button>,
        })),
    };

    useEffect(() => {
        getCsrApproval();
    }, [fetchdata])

    return (
        <>
            <div>
                <Navbar />
                <Sidebar />
                <main id="main" class="main " style={{ marginTop: "80px" }}>
                    <div class="pagetitle">
                        <h1>CSR Approval</h1>
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Data Table</a></li>
                                <li class="breadcrumb-item active">CSR Approval</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='card' style={{ padding: "20px" }}>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            data={data}
                            noBottomColumns
                        />
                        {showfundmodal && <FundsModal studentId={studentId} />}
                        {showcsrmdcomment && <CommentsModal alldetails={details} btnCode={btncode} approverCode={1} stid={studentId} />}
                    </div>
                </main>
            </div>
        </>
    )
}

export default CsrApproval
