import React from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Collegeform from './components/collegeform';
import withAuth from './withauth';

const Collegeformpage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main id="main" class="main" style={{ marginLeft: "240px" }}>
        <Collegeform />
        {/* <div className='mt-5 container' >
          <img src='qlogo.jpg' alt='qlogo' style={{ width: "106px" }} />
          <p>Developed And Maintained By <strong>Quobotic Consulting Private Limited</strong></p>
        </div> */}
      </main>
    </div>

  )
}

export default withAuth(Collegeformpage);