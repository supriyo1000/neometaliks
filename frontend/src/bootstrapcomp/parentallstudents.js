import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Allstudents from './allstudents';
import ipAddress from '../ipconfig';


const Parentallstudents = () => {
    const [data, setData] = useState([]);

    console.log(data);

    async function fetchallstudents(param) {
        const response = await fetch(`http://${ipAddress}:8000/users/fetchallstudents?dbmode=${param}`).then(res => res.json());
        setData(response);
        console.log(response);
    }


    return (
        <React.Fragment>
            <Navbar />
            <Sidebar />
            <main id="main" class="main " style={{ marginLeft: "240px", marginTop: "100px" }}>
                <div className='container' style={{ padding: "30px" }}>
                    <h4>Student Approval Status</h4>
                    <div className='container' style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "80px", padding: "30px", background: "beige" }}>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={0} onClick={() => fetchallstudents(1)} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                No Approve Student
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={1} onClick={() => fetchallstudents(2)} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                First Approve Student
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value={2} onClick={() => fetchallstudents(3)} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Second Approve Student
                            </label>
                        </div>
                    </div>
                    <Allstudents allstudents={data} />
                </div>

            </main>
        </React.Fragment>
    )
}

export default Parentallstudents