import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./pdfresume.css";
import ReactToPrint from 'react-to-print';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import PDFDocument from './pdfdocument';
import withAuth from '../withauth';
import ipAddress from '../ipconfig';

const Pdfresume = () => {

    const [student, setStudent] = useState("");
    const [files, setFiles] = useState("");
    const [isContentReady, setIsContentReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const pdfRef = useRef(null);

    console.log(student);
    console.log(isContentReady);


    const studentids = localStorage.getItem("studentid");
    const studentid = parseInt(studentids, 10);
    console.log(studentid);
    const fetchdata = async () => {
        setIsLoading(true);
        const data = await axios.post(`http://${ipAddress}:8001/alldata`, { stid: studentid }).then(dataset => setStudent(dataset.data.studentDetails[0][0][0]))
        setIsLoading(false);
        // console.log(data.data.studentDetails[0][0][0].StudentName);
    }

    const fetchfile = async () => {
        const data = await axios.post(`http://${ipAddress}:8001/alldata`, { stid: studentid }).then(dataset => setFiles(dataset.data.fileDetails[0][0][0]))
        // console.log(data.data);
    }

    const generatePDF = () => {
        if (!pdfRef.current) return;

        html2canvas(pdfRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('document.pdf');
        });
    };

    useEffect(() => {
        fetchdata();
        fetchfile();
        setIsContentReady(true);
    }, [])

    return (
        <>

            {isLoading && (
                <div className="loading-container">
                    <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                </div>
            )}
            <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
            <div style={{
                display: "flex",
                justifyContent: "end",
                margin: "65px 65px 0 0"
            }}>
                <ReactToPrint
                    trigger={() => <button className="btn btn-primary">Generate PDF</button>}
                    content={() => pdfRef.current}
                />
            </div>


            <div ref={pdfRef} class="resume" style={{
                boxShadow: "5px 2px 20px 13px #6e7981", pageBreakBefore: 'always'
            }}>
                <div class="resume_left">
                    <div class="resume_profile">
                        {student && <img src={`http://${ipAddress}:8001/uploads/${files.photo}`} alt='img1' />}

                    </div>
                    <div class="resume_content">
                        <div class="resume_item resume_info">
                            <div class="title">
                                <p class="bold">{student && student.StudentName}</p>
                                {/* <p class="regular">Designer</p> */}
                            </div>
                            <div>

                                <p class="regular">Address&nbsp;: &nbsp;{student && student.address}</p>

                                <p class="regular">Pincode&nbsp;: &nbsp;{student && student.pincode}</p>

                                <p class="regular">Phone&nbsp;: &nbsp;{student && student.StudentPhone}</p>

                                <p class="regular">Email&nbsp;: &nbsp;{student && student.StudentEmail}</p>

                                <p class="regular">Post Office&nbsp;: &nbsp;{student && student.postoffice}</p>

                                <p class="regular">Police Station&nbsp;: &nbsp;{student && student.policestation}</p>

                                <p class="regular">Municipality&nbsp;: &nbsp;{student && student.municipality}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="resume_right">
                    <div class="resume_item resume_work">
                        <div class="title">
                            <p class="bold">Parents Details</p>

                        </div>
                        <ul>
                            <li>
                                <div class="date"><h5 style={{ fontWeight: "bold" }}>Father Details</h5></div>
                                <div class="info">
                                    <p class="semi-bold">Father’s Name <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.fatherName}</p>
                                    <p class="semi-bold">Father’s Occupation <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.fatheroccupation}</p>
                                    <p class="semi-bold">Annual Income <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.fatherIncome}</p>
                                    <p class="semi-bold">Office Phone No <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.fatherPhone}</p>
                                    <p class="semi-bold">Office Address <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.fatherOaddress}</p>
                                </div>
                            </li>
                            <li>
                                <div class="date"><h5 style={{ fontWeight: "bold" }}>Mother’s Details</h5></div>
                                <div class="info">
                                    <p class="semi-bold">Mother’s Name <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.motherName}</p>
                                    <p class="semi-bold">Mother’s Occupation <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.motherOccupation}</p>
                                    <p class="semi-bold">Annual Income <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.motherIncome}</p>
                                    <p class="semi-bold">Office Phone No <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.motherPhone}</p>
                                    <p class="semi-bold">Office Address <span class="text-danger">:</span>&nbsp;&nbsp;{student && student.motherOaddress}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="resume_item resume_education">
                        <div class="title">
                            <p class="bold">Education</p>
                        </div>
                        <ul>
                            <li>
                                <div class="date" style={{ fontWeight: "bold" }}>Currently Pursuing</div>
                                <div class="info">
                                    <p class="semi-bold">{student && student.cof}</p>
                                    <p class="semi-bold">{student && student.noc}</p>
                                    <p style={{ fontWeight: "bold" }}>Major Subjects</p>
                                    <p class="semi-bold">{student && student.subjects}</p>
                                    {/* <p class="semi-bold">{student.xboard}</p> */}
                                </div>
                            </li>
                            <li>
                                <div class="date" style={{ fontWeight: "bold" }}>Secondary Education &nbsp;({student && student.x_passing_year && student.x_passing_year.substring(0, 10)})</div>
                                <div class="info">
                                    <p class="semi-bold">{student && student.xschool}</p>
                                    {/* {student.x_passing_year && student.x_passing_year.substring(0, 10)} */}
                                    <p class="semi-bold">{student && student.xmarks}&nbsp;%</p>
                                    <p class="semi-bold"><span style={{ fontWeight: "bold" }}>Board :</span> {student && student.xboard}</p>
                                </div>
                            </li>
                            <li>
                                <div class="date" style={{ fontWeight: "bold" }}>Higher Secondary Education &nbsp;({student && student.xii_passing_year && student.xii_passing_year.substring(0, 10)})</div>
                                <div class="info">
                                    <p class="semi-bold">{student && student.xiischool}</p>
                                    {/* {student.xii_passing_year && student.xii_passing_year.substring(0, 10)} */}
                                    <p class="semi-bold">{student && student.xiimarks}&nbsp;%</p>
                                    <p class="semi-bold"><span style={{ fontWeight: "bold" }}>Board :</span>{student && student.xiiboard}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pdfresume;
