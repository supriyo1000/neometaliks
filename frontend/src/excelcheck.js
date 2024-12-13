import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import axios from 'axios';
import ipAddress from './ipconfig';
import { ExportToExcel } from './excelfile';

const Excelcheck = () => {

    const [student, setStudent] = useState("");
    const [selectedPages, setSelectedPages] = useState([]);
    const [selectedPages2, setSelectedPages2] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log(selectedPages);
    console.log(selectedPages2);

    console.log(student);

    const allPageValues = student ? [
        student.StudentName, student.Gender, student.StudentEmail,
        student.StudentPhone, student.address,
        student.DateofBirth, student.fatherIncome, student.fatherName,
        student.fatheroccupation, student.motherIncome, student.motherName,
        student.motherOccupation, student.municipality, student.noc,
        student.pincode, student.policestation, student.postoffice,
        student.ros, student.sb, student.str,
        student.subjects, student.x_passing_year, student.xboard,
        student.xii_passing_year, student.xiiboard, JSON.stringify(student.xiimarks),
        student.xiischool, JSON.stringify(student.xmarks), student.xschool,
        student.ces, student.cof
    ] : [];

    const allPageValues2 = student ? [{
        StudentName: student.StudentName, Gender: student.Gender, StudentEmail: student.StudentEmail,
        StudentPhone: student.StudentPhone, Address: student.address,
        DateofBirth: student.DateofBirth, FatherIncome: student.fatherIncome, FatherName: student.fatherName,
        Fatheroccupation: student.fatheroccupation, MotherIncome: student.motherIncome, MotherName: student.motherName,
        MotherOccupation: student.motherOccupation, Municipality: student.municipality, College_Name: student.noc,
        Pincode: student.pincode, Policestation: student.policestation, Postoffice: student.postoffice,
        Reason_for_Scholarship: student.ros, Deserving_Candidate: student.sb, Strength: student.str,
        Subjects: student.subjects, Class_X_passing_year: student.x_passing_year, Class_X_board: student.xboard,
        Class_Xii_passing_year: student.xii_passing_year, Class_Xii_Board: student.xiiboard, Class_Xii_marks: student.xiimarks,
        Class_Xii_school: student.xiischool, Class_X_marks: student.xmarks, Class_X_school: student.xschool,Class: student.ces,Course: student.cof
    }] : [];

    const handleSelectAllChange = (e) => {
        e.target.checked ? setSelectedPages(allPageValues) : setSelectedPages([]);
        e.target.checked ? setSelectedPages2(allPageValues2) : setSelectedPages2([]);
        //  console.log(selectedPages);
    };

    const handleCheckboxChange = (event, field) => {
        const { value } = event.target;
        setSelectedPages((prevSelectedPages) =>
            event.target.checked
                ? [...prevSelectedPages, value]
                : prevSelectedPages.filter((page) => page !== value)
        );

        setSelectedPages2((prevSelectedPages) => {
            const lastObject = { ...prevSelectedPages[prevSelectedPages.length - 1] };
            if (event.target.checked) {
                lastObject[field] = value;
                return [lastObject];
            } else {
                delete lastObject[field];
                return [...prevSelectedPages.slice(0, -1), lastObject];
            }
        });
    };


    const studentid = localStorage.getItem("studentid");
    console.log(studentid);

    const fetchdata = async () => {
        const data = await axios.post(`http://${ipAddress}:8001/alldata`, { stid: studentid }).then(dataset => {
            setStudent(dataset.data.studentDetails[0][0][0]);
            console.log(dataset.data.studentDetails[0][0][0]);
        })
    }

    // const data = [{
    //     "slno": 'item.slno',
    //     "withinrange": 'item.withinrange',
    //     "aboverange": 'item.aboverange',
    //     "belowrange": 'item.belowrange',
    //     "isempty": 'item.isempty',
    //     "time": 'item.cur_time',
    //     "date": 'formatDate(item.cur_date)',
    // }, {
    //         "slno": 'item.slno',
    //         "withinrange": 'item.withinrange',
    //         "aboverange": 'item.aboverange',
    //         "belowrange": 'item.belowrange',
    //         "isempty": 'item.isempty',
    //         "time": 'item.cur_time',
    //         "date": 'formatDate(item.cur_date)',
    //     }]

    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <>
            <Navbar />
            <Sidebar />

            <main id="main" class="main" style={{ marginLeft: "240px", marginTop: '80px' }}>

                {isLoading && (
                    <div className='overlay'>
                        <div className="loading-container" style={{ zIndex: "1" }}>
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}

                <section class="section dashboard">
                    <div class="row">
                        <div class="col-12">
                            <div class="card recent-sales overflow-auto" style={{ height: "100%" }}>

                                <div class="card-body">

                                    <div className='row p-3' style={{ justifyContent: "space-between" }}>
                                        <div className='col-4'>
                                            <h5 class="card-title">Excel Report</h5>
                                        </div>
                                        <div className='col-4' style={{ alignSelf: "center" }}>
                                            <ExportToExcel apiData={selectedPages2} fileName={student.StudentName} per={true} />
                                        </div>
                                        <div className='col-2' style={{ alignSelf: "center", textAlign: "center" }}>
                                            <ul class="card-title" style={{ display: "flex", justifyContent: "space-around" }}>
                                                <li >Select All</li>
                                                <li><input type='checkbox' checked={selectedPages.length === allPageValues.length} onChange={handleSelectAllChange} /></li>
                                            </ul>
                                        </div>
                                    </div>


                                    <table class="table table-borderless datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">Serial</th>
                                                <th scope="col">Field</th>
                                                <th scope="col">Value</th>
                                                <th scope="col">Check</th>
                                            </tr>
                                        </thead>
                                        <tbody className='excel-body'>

                                            <tr>
                                                <th scope="row"><a href="#">1</a></th>
                                                <td>Student Name</td>
                                                <td class="text-primary">{student.StudentName}</td>
                                                <td><input type='checkbox' id={`check-1`} checked={selectedPages.includes(student.StudentName)} value={student.StudentName} onChange={(e) => handleCheckboxChange(e, 'StudentName')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">2</a></th>
                                                <td>Gender</td>
                                                <td class="text-primary">{student.Gender}</td>
                                                <td><input type='checkbox' id={`check-2`} checked={selectedPages.includes(student.Gender)} value={student.Gender} onChange={(e) => handleCheckboxChange(e, 'Gender')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">3</a></th>
                                                <td>Student Email</td>
                                                <td class="text-primary">{student.StudentEmail}</td>
                                                <td><input type='checkbox' id={`check-3`} checked={selectedPages.includes(student.StudentEmail)} value={student.StudentEmail} onChange={(e) => handleCheckboxChange(e, 'StudentEmail')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">4</a></th>
                                                <td>Student Phone</td>
                                                <td class="text-primary">{student.StudentPhone}</td>
                                                <td><input type='checkbox' id={`check-4`} checked={selectedPages.includes(student.StudentPhone)} value={student.StudentPhone} onChange={(e) => handleCheckboxChange(e, 'StudentPhone')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">5</a></th>
                                                <td>Address</td>
                                                <td class="text-primary">{student.address}</td>
                                                <td><input type='checkbox' id={`check-5`} checked={selectedPages.includes(student.address)} value={student.address} onChange={(e) => handleCheckboxChange(e, 'Address')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">6</a></th>
                                                <td>Date of Birth</td>
                                                <td class="text-primary">{student.DateofBirth}</td>
                                                <td><input type='checkbox' id={`check-6`} checked={selectedPages.includes(student.DateofBirth)} value={student.DateofBirth} onChange={(e) => handleCheckboxChange(e, 'DateOfBirth')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">7</a></th>
                                                <td>Father Name</td>
                                                <td class="text-primary">{student.fatherName}</td>
                                                <td><input type='checkbox' id={`check-7`} checked={selectedPages.includes(student.fatherName)} value={student.fatherName} onChange={(e) => handleCheckboxChange(e, 'Father_Name')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">8</a></th>
                                                <td>Father Income</td>
                                                <td class="text-primary">{student.fatherIncome}</td>
                                                <td><input type='checkbox' id={`check-8`} checked={selectedPages.includes(student.fatherIncome)} value={student.fatherIncome} onChange={(e) => handleCheckboxChange(e, 'Father_Income')} /></td>
                                            </tr>
                                            {/* <tr>
                                                <th scope="row"><a href="#">9</a></th>
                                                <td>Father Phone</td>
                                                <td class="text-primary">{student.fatherPhone}</td>
                                                <td><input type='checkbox' id={`check-9`} checked={selectedPages.includes(student.fatherPhone)} value={student.fatherPhone} onChange={(e) => handleCheckboxChange(e, 'Father_Phone')} /></td>
                                            </tr> */}

                                            <tr>
                                                <th scope="row"><a href="#">10</a></th>
                                                <td>Father Occupation</td>
                                                <td class="text-primary">{student.fatheroccupation}</td>
                                                <td><input type='checkbox' id={`check-10`} checked={selectedPages.includes(student.fatheroccupation)} value={student.fatheroccupation} onChange={(e) => handleCheckboxChange(e, 'Father_Occupation')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">11</a></th>
                                                <td>Mother Name</td>
                                                <td class="text-primary">{student.motherName}</td>
                                                <td><input type='checkbox' id={`check-11`} checked={selectedPages.includes(student.motherName)} value={student.motherName} onChange={(e) => handleCheckboxChange(e, 'Mother_Name')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">12</a></th>
                                                <td>Mother Occupation</td>
                                                <td class="text-primary">{student.motherOccupation}</td>
                                                <td><input type='checkbox' id={`check-12`} checked={selectedPages.includes(student.motherOccupation)} value={student.motherOccupation} onChange={(e) => handleCheckboxChange(e, 'Mother_Occupation')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">13</a></th>
                                                <td>Mother Income</td>
                                                <td class="text-primary">{student.motherIncome}</td>
                                                <td><input type='checkbox' id={`check-13`} checked={selectedPages.includes(student.motherIncome)} value={student.motherIncome} onChange={(e) => handleCheckboxChange(e, 'Mother_Income')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">14</a></th>
                                                <td>Municipality</td>
                                                <td class="text-primary">{student.municipality}</td>
                                                <td><input type='checkbox' id={`check-14`} checked={selectedPages.includes(student.municipality)} value={student.municipality} onChange={(e) => handleCheckboxChange(e, 'Municipality')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">15</a></th>
                                                <td>Pincode</td>
                                                <td class="text-primary">{student.pincode}</td>
                                                <td><input type='checkbox' id={`check-15`} checked={selectedPages.includes(student.pincode)} value={student.StudentName} onChange={(e) => handleCheckboxChange(e, 'Pincode')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">16</a></th>
                                                <td>Police Station</td>
                                                <td class="text-primary">{student.policestation}</td>
                                                <td><input type='checkbox' id={`check-16`} checked={selectedPages.includes(student.policestation)} value={student.policestation} onChange={(e) => handleCheckboxChange(e, 'Police_Station')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">17</a></th>
                                                <td>Post Office</td>
                                                <td class="text-primary">{student.postoffice}</td>
                                                <td><input type='checkbox' id={`check-17`} checked={selectedPages.includes(student.postoffice)} value={student.postoffice} onChange={(e) => handleCheckboxChange(e, 'Post_Office')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">18</a></th>
                                                <td>Class-X School</td>
                                                <td class="text-primary">{student.xschool}</td>
                                                <td><input type='checkbox' id={`check-18`} checked={selectedPages.includes(student.xschool)} value={student.xschool} onChange={(e) => handleCheckboxChange(e, 'Class-X_School')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">19</a></th>
                                                <td>Class-X Board</td>
                                                <td class="text-primary">{student.xboard}</td>
                                                <td><input type='checkbox' id={`check-19`} checked={selectedPages.includes(student.xboard)} value={student.xboard} onChange={(e) => handleCheckboxChange(e, 'Class-X_Board')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">20</a></th>
                                                <td>Class-X Passing Year</td>
                                                <td class="text-primary">{student.x_passing_year}</td>
                                                <td><input type='checkbox' id={`check-20`} checked={selectedPages.includes(student.x_passing_year)} value={student.x_passing_year} onChange={(e) => handleCheckboxChange(e, 'Class-X_Passing_Year')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">21</a></th>
                                                <td>Class-X Marks</td>
                                                <td class="text-primary">{student.xmarks}</td>
                                                <td><input type='checkbox' id={`check-21`} checked={selectedPages.includes(JSON.stringify(student.xmarks))} value={JSON.stringify(student.xmarks)} onChange={(e) => handleCheckboxChange(e, 'Class-X_Marks')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">22</a></th>
                                                <td>Class-XII School</td>
                                                <td class="text-primary">{student.xiischool}</td>
                                                <td><input type='checkbox' id={`check-22`} checked={selectedPages.includes(student.xiischool)} value={student.xiischool} onChange={(e) => handleCheckboxChange(e, 'Class-XII_School')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">23</a></th>
                                                <td>Class-XII Board</td>
                                                <td class="text-primary">{student.xiiboard}</td>
                                                <td><input type='checkbox' id={`check-23`} checked={selectedPages.includes(student.xiiboard)} value={student.xiiboard} onChange={(e) => handleCheckboxChange(e, 'Class_XII_Board')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">24</a></th>
                                                <td>Class-XII Passing Year</td>
                                                <td class="text-primary">{student.xii_passing_year}</td>
                                                <td><input type='checkbox' id={`check-24`} checked={selectedPages.includes(student.xii_passing_year)} value={student.xii_passing_year} onChange={(e) => handleCheckboxChange(e, 'Class-XII_Passing_Year')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">25</a></th>
                                                <td>Class-XII Marks</td>
                                                <td class="text-primary">{student.xiimarks}</td>
                                                <td><input type='checkbox' id={`check-25`} checked={selectedPages.includes(JSON.stringify(student.xiimarks))} value={JSON.stringify(student.xiimarks)} onChange={(e) => handleCheckboxChange(e, 'Class-XII_Marks')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">26</a></th>
                                                <td>College Name</td>
                                                <td class="text-primary">{student.noc}</td>
                                                <td><input type='checkbox' id={`check-26`} checked={selectedPages.includes(student.noc)} value={student.noc} onChange={(e) => handleCheckboxChange(e, 'College_Name')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">27</a></th>
                                                <td>Class</td>
                                                <td class="text-primary">{student.ces}</td>
                                                <td><input type='checkbox' id={`check-27`} checked={selectedPages.includes(student.ces)} value={student.ces} onChange={(e) => handleCheckboxChange(e, 'Class')} /></td>
                                            </tr>

                                            <tr>
                                                <th scope="row"><a href="#">28</a></th>
                                                <td>Subjects</td>
                                                <td class="text-primary">{student.subjects}</td>
                                                <td><input type='checkbox' id={`check-28`} checked={selectedPages.includes(student.subjects)} value={student.subjects} onChange={(e) => handleCheckboxChange(e, 'Subjects')} /></td>
                                            </tr>
                                            {/* <tr>
                                                <th scope="row"><a href="#">29</a></th>
                                                <td>Alternative Number</td>
                                                <td class="text-primary">{student.AltNumber}</td>
                                                <td><input type='checkbox' id={`check-29`} checked={selectedPages.includes(JSON.stringify(student.AltNumber))} value={student.AltNumber} onChange={(e) => handleCheckboxChange(e, 'Alternative_Number')} /></td>
                                            </tr> */}
                                            <tr>
                                                <th scope="row"><a href="#">30</a></th>
                                                <td>Course</td>
                                                <td class="text-primary">{student.cof}</td>
                                                <td><input type='checkbox' id={`check-30`} checked={selectedPages.includes(student.cof)} value={student.cof} onChange={(e) => handleCheckboxChange(e, 'Course')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">31</a></th>
                                                <td>Reason for seeking scholarship</td>
                                                <td class="text-primary">{student.ros}</td>
                                                <td><input type='checkbox' id={`check-31`} checked={selectedPages.includes(student.ros)} value={student.ros} onChange={(e) => handleCheckboxChange(e, 'Reason_for_scholarship')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">32</a></th>
                                                <td>Strengths and Weaknesses </td>
                                                <td class="text-primary">{student.str}</td>
                                                <td><input type='checkbox' id={`check-32`} checked={selectedPages.includes(student.str)} value={student.str} onChange={(e) => handleCheckboxChange(e, 'Strengths_and_Weaknesses')} /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#">33</a></th>
                                                <td>Deserving Candidate for the Scholarship Because</td>
                                                <td class="text-primary">{student.sb}</td>
                                                <td><input type='checkbox' id={`check-33`} checked={selectedPages.includes(student.sb)} value={student.sb} onChange={(e) => handleCheckboxChange(e, 'Deserving_Candidate_for_the_Scholarship_Because')} /></td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>

                    </div>
                </section>

            </main>
            {/* <!-- End #main --> */}



            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>Quobotic Consulting Private Limited</span></strong>. All Rights Reserved
                </div>
            </footer>
        </>
    )
}

export default Excelcheck;