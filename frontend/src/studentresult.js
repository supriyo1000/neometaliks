import React, { useEffect, useRef, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import ReactToPrint from 'react-to-print';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import ipAddress from './ipconfig';
import { useNavigate } from 'react-router-dom';
import { setShowDisbursedModal, setStudentDetails } from './actions/disbursedAction';
import DisbursedModal from './bootstrapcomp/disbursedModal';

const Studentresult = () => {

    const [students, setStudents] = useState([]);
    // const [status, setStatus] = useState({});
    // const [stuDes, setStuDes] = useState({});
    // const resultPdfRef = useRef();
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const showDisbursedModal = useSelector((state) => state.disbursed.disbursedmodal);
    const studentdetails = useSelector((state) => state.disbursed.studentdetails);

    async function fetchstudent() {
        const data = await fetch(`http://${ipAddress}:8002/images/get_student_result`).then(res => res.json()).then(dataset => {
            setStudents(dataset);
            console.log(dataset);
        });
    }


    // const resultButton = (id, sem) => {
    //     localStorage.setItem('studentid', id);
    //     localStorage.setItem('class', sem);
    //     navigate('/showresult');
    // }

    const showButton = (id, name, sem) => {
        dispatch(setStudentDetails({
            stuid: id,
            stuName: name,
            semester: sem
        }));
        dispatch(setShowDisbursedModal(true));

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
                width: 150,
            },
            {
                label: 'Course',
                field: 'course',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Semester',
                field: 'semester',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Result',
                field: 'result',
                sort: 'asc',
                width: 200
            }
            
        ],
        rows: students.map((student, index) => ({
            name: student.studentname,
            position: student.collegename,
            course: student.cof,
            semester: student.semester,
            // status: <span class="badge bg-success">Approved</span>,
            result: <button className='btn btn-outline-success mail-button' onClick={() => showButton(student.student_id, student.studentname, student.semester )}>Show</button>
        }))
    };


    useEffect(() => {
        fetchstudent();    
    },[])


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
                  <div style={{padding:"1.5rem"}}>
                      <MDBDataTable
                          striped
                          bordered
                          small
                          data={data}
                          noBottomColumns
                      /> 
                  </div>
                  {showDisbursedModal && <DisbursedModal />}
              </main>
          </div>
      </>
  )
}

export default Studentresult;