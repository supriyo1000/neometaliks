import React from 'react';
// import StudentInput from './studentsearch';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Studentform from './studentform';
import withAuth from '../withauth';

const InputStudentpage = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <main id="main" class="main" style={{ marginLeft: "240px" }}>
                <Studentform />

            </main>
        </div>

    )
}

export default withAuth(InputStudentpage);