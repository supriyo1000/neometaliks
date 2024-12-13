import React, { useEffect } from 'react'
// import Form from './form'
import Sidebar from './components/sidebar'
// import { Link, useNavigate } from 'react-router-dom';
import "./App.css"
import Viewform from './viewform'
import Navbar from './components/navbar'

const Viewformlayout = () => {
    return (
        <>
            <Navbar />

            <Sidebar />
            <main id="main" class="main" style={{ marginLeft: "240px" }}>

                <Viewform />


                <footer class="main-footer mt-4">
                    <strong>Copyright &copy; 2019-2023 <a href="#">Quobotic Consulting Private Limited</a>.</strong>
                    All rights reserved.
                    <div class="float-right d-none d-sm-inline-block">
                        <b>Demo Version</b>
                    </div>
                </footer>

                {/* <!-- Control Sidebar --> */}
                <aside class="control-sidebar control-sidebar-dark">
                    {/* <!-- Control sidebar content goes here --> */}
                </aside>
            </main>
            {/* <!-- /.control-sidebar --> */}
        </>

    )
}

export default Viewformlayout;