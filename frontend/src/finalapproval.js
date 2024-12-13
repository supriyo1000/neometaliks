import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withauth from "./withauth";


import { setphonestatus, setName, setGrade, setMarks, setEmailstatus, setColor, setModal, setEducation, setPhone, setEmail } from './actions/mentorActions';
import { setStudents, setDashboardModal } from './actions/dashboardAction';
import axios from 'axios';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import DashboardTable from './bootstrapcomp/dashboardtable';
import ipAddress from './ipconfig';

const Finalapproval = (props) => {

    const [studentcount, setStudentcount] = useState(null);
    const dispatch = useDispatch();

    const students = useSelector((state) => state.dashboard.students);
    const dashboardmodal = useSelector((state) => state.dashboard.dashboardmodal);

    async function fetchFirstApprove() {
        try {
            const response = await fetch(`http://${ipAddress}:8000/users/fetchfirstapprove`);
            const data = await response.json(); // Parse the response data
            setStudentcount(data.totalRowCount); // Assuming totalRowCount is the correct property name
            dispatch(setStudents(data.response2[0][0]))
            console.log(data.totalRowCount);
            console.log(data.response2[0][0]);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchFirstApprove();   
},[])
    return (
        <React.Fragment>
            <Sidebar />
            <Navbar />
            <main id="main" class="main " style={{ marginLeft: "240px", marginTop: "80px" }}>
                <div className='container'>
                    <div>
                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">
                                <div class="card-body">
                                    <h5 class="card-title">Pending Second Approval </h5>
                                    <div class="d-flex align-items-center">
                                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        </div>
                                        <div class="ps-3">
                                            <h6 style={{fontWeight:"bold"}}>{ studentcount }</h6>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DashboardTable allstudents={students} />
                </div>
            </main>
            
        </React.Fragment>
    )
}

export default withauth(Finalapproval);