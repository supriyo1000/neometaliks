import React, { useEffect, useState } from 'react';
import withAuth from './withauth';
// import Aside from './aside'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import ipAddress from './ipconfig';
import { setFocusMenu } from './actions/mentorActions';
import { useDispatch } from 'react-redux';

const Allusers = () => {

    const [u, setU] = useState([]);
    const navigate = useNavigate();


    // const logout = async () => {
    //     localStorage.removeItem("studentid");
    //     navigate("/login")
    // }

    console.log(u);
    const users = async () => {
        const data = await fetch(`http://${ipAddress}:8001/usersdetails`).then(res => res.json()).then(dataset => setU(dataset[0][0]))
        return data;

    }

    const navi = async () => {
        navigate("/viewformlayout")
    }

    const navitopdf = async () => {
        navigate("/pdfresume")
    }

    const saveid = async (d, page) => {
        try {
            localStorage.setItem("studentid", d);
            navigate(page);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        users();
    }, [])

    return (


        <div class="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">

                {/* <!-- Navbar --> */}
                <Navbar />
                {/* <!-- /.navbar --> */}

                {/* <!-- Main Sidebar Container --> */}
                <Sidebar />
                <main id="main" class="main" style={{ marginLeft: "240px" }}>
                    {/* <!-- Content Wrapper. Contains page content --> */}
                    <div class="content-wrapper">
                        <div className='container' style={{ padding: "4em" }}>
                            <h3>List Of Student Details- Uploaded Personal Data</h3>
                            <table class="table table-striped mt-5">
                                <thead>
                                    <tr>

                                        <th scope="col">Student Name</th>
                                        <th scope="col">Email id</th>
                                        <th scope="col">Download PDF</th>
                                        <th scope="col">Show</th>
                                        <th scope="col">Excel Sheet</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {u.map((us, index) => {
                                        return <tr key={index} >
                                            {/* <th scope="row">{index}</th> */}
                                            <td>{us.name}</td>
                                            <td>{us.email}</td>
                                            <td><button className='btn btn-success mail-button' onClick={(e) => { saveid(us.studentid); navitopdf(); }}>Click</button></td>
                                            <td><button className='btn btn-primary mail-button' onClick={(e) => saveid(us.studentid, "/viewformlayout")}>Show</button></td>
                                            <td style={{ textAlign: "center" }}>
                                                <button className='btn btn-info mail-button' onClick={(e) => saveid(us.studentid, "/excel_report")}>Excel</button>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='mt-5 container' style={{ position: "absolute", bottom: "0" }}>
                        <img src='qlogo.jpg' alt='qlogo' style={{ width: "106px" }} />
                        <p>Developed And Maintained By <strong>Quobotic Consulting Private Limited</strong></p>
                    </div>

                    <Link to={'/viewform'}>navi</Link>
                </main>
                {/* <!-- /.content-wrapper --> */}


                {/* <!-- Control Sidebar --> */}
                {/* <aside class="control-sidebar control-sidebar-dark">
                    
                </aside> */}
                {/* <!-- /.control-sidebar --> */}
            </div>

        </div>
    )
}

export default withAuth(Allusers);