import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ipAddress from './ipconfig';
import axios from 'axios';

const Journey = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectstud, setSelectstud] = useState([]);
    const [selectstudent, setSelectstudent] = useState(null);
    const [coll_ID, setColl_Id] = useState(null);
    const [rol, setRol] = useState(null);

    const navigate = useNavigate();

    console.log(students);

    async function fetchuserdetail(id) {
        try {
            const response = await axios.get(`http://${ipAddress}:8000/users/fetchuserdetails?roleid=${id}`);
            setRol(response.data[0].roleId);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchdata() {
        const data = await fetch(`http://${ipAddress}:8000/users/colleges`).then(res => res.json()).then(dataset => setColleges(dataset));
        return data;
    }

    async function fetchstudent(clgId, stuId, dbmode) {

        const data = await fetch(`http://${ipAddress}:8000/getAllStudents?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
            setStudents(dataset);
            // console.log(data);
        });

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
                label: 'Journey',
                field: 'journey',
                sort: 'asc',
                width: 150, // You can remove the 'width' property here
            }
        ],

        rows: students.map((student, index) => ({
            name: <p style={{ fontSize: "14px", marginBottom: 0 }} key={index}>{student.studentname}</p>,
            journey: <p style={{ display: "flex", justifyContent: "center", alignContent: "center" }}><button className='btn btn-primary mail-button' onClick={() => {
                localStorage.setItem("Sp", student.serialno);
                navigate("/journeystatus")
            }}>Student Journey</button></p>,
        })),
    };

    const userid = localStorage.getItem("processNo");

    useEffect(() => {
        fetchdata();

    }, [students])

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
                        <div class="row">

                            {/* <!-- Left side columns --> */}
                            <div class="col-8">
                                <div class="row">

                                    {/* <!-- Customers Card --> */}
                                    <div class="col-12">

                                        <div class="card info-card customers-card">

                                            <div class="card-body">
                                                <div className='row'>
                                                    <h5 class="card-title">Select College</h5>
                                                    <div className='col-8'>

                                                        <div class="d-flex align-items-center">
                                                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-house-fill"></i>
                                                            </div>
                                                            <div class="ps-3">
                                                                <select class="form-select" aria-label="Default select example" onChange={(e) => { fetchstudent(e.target.value, 0, 1); setColl_Id(e.target.value) }}>
                                                                    <option selected>Open this select menu</option>
                                                                    {colleges.map((college, index) => {
                                                                        return <option value={college.coll_ID} key={index} >{college.collegename}</option>
                                                                    })}

                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <!-- End Customers Card --> */}


                                    <div class="col-12">
                                        <div class="card recent-sales overflow-auto">

                                            <div class="card-body">
                                                <h5 class="card-title">List Of Student</h5>

                                                <MDBDataTable
                                                    striped
                                                    bordered
                                                    small
                                                    data={data}
                                                    noBottomColumns
                                                />

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                </main>
            </div>
        </>
    )
}

export default Journey;
