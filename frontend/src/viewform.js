import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ipAddress from './ipconfig';


const Viewform = () => {

    const [student, setStudent] = useState("");
    const [files, setFiles] = useState("");
    console.log(student);
    console.log(files);


    const studentid = localStorage.getItem("studentid");
    console.log(studentid);
    const fetchdata = async () => {
        const data = await axios.post(`http://${ipAddress}:8001/alldata`, { stid: studentid }).then(dataset => setStudent(dataset.data.studentDetails[0][0][0]))
        console.log(data.data.studentDetails[0][0][0]);
    }

    const fetchfile = async () => {
        const data = await axios.post(`http://${ipAddress}:8001/alldata`, { stid: studentid }).then(dataset => setFiles(dataset.data.fileDetails[0][0][0]))
        console.log(data.data);
    }

    function isImageFile(filename) {
        if (!filename) {
            // Handle the case where the filename is undefined or empty
            return false;
        }

        // Get the file extension
        const fileExtension = filename.split('.').pop();

        // List of image file extensions (add more as needed)
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        console.log(imageExtensions.includes(fileExtension.toLowerCase()));
        // Check if the file extension is in the list of image extensions
        return imageExtensions.includes(fileExtension.toLowerCase());
    }
    async function getimage(imgname) {
        try {
            // Send a request to the server to download the image
            const response = await fetch(`http://${ipAddress}:8001/download-image?imageId=${imgname}`);

            if (response.ok) {
                // If the response status is OK (HTTP 200), proceed to download the image

                // Get the image data as a blob
                const blob = await response.blob();

                // Create a blob URL from the blob data
                const url = URL.createObjectURL(blob);

                // Create a temporary anchor element to trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = imgname; // Set the desired file name
                link.style.display = 'none';

                // Append the anchor element to the document and trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up by removing the anchor element
                document.body.removeChild(link);

            } else {
                // Handle non-successful responses (e.g., display an error message)
                console.error(`Failed to download image: HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`Error while downloading image: ${error}`);
        }
    }



    useEffect(() => {
        fetchdata();
        fetchfile();
    }, [])



    return (
        <>
            {
                student !== undefined && files !== undefined ?



                    <div class="container">

                        {/* <ContextProvider ids={id} /> */}
                        <div className="container login" style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "3em"
                        }}>
                            <form style={{ backgroundColor: "white" }} id="form">
                                <div id="q0" class="q">
                                    <div>
                                        <h3 style={{ width: "32%" }}>Personal Details</h3>
                                    </div>


                                    <h5 style={{ width: "32%" }}>Name and Date of Birth</h5>

                                    <div class="row" style={{ alignItems: "center" }}>
                                        <div class="col-md-4">

                                            <p style={{ color: "black" }}>Full Name <span class="text-danger">:</span>&nbsp;&nbsp;{student.StudentName}</p>

                                        </div>

                                        <div class="col-md-3">
                                            <p>Date of Birth <span class="text-danger">:</span>&nbsp;&nbsp;{student.DateofBirth}</p>



                                        </div>
                                        <div class="col-md-5" style={{ textAlign: "center" }}>
                                            <p >
                                                {isImageFile(files.photo) === true ? (
                                                   
                                                    <div class="imagedownload-container">
                                                        <img src={`http://${ipAddress}:8001/uploads/${files.photo}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                        <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                            e.preventDefault();
                                                            getimage(files.photo);
                                                        }}>Download</button>
                                                    </div>
                                                ) : (
                                                        <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                            <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                            <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.photo}`} download >Download</a>
                                                        </div>
                                                )}

                                            </p>

                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <p>Gender <span class="text-danger">:</span>&nbsp;&nbsp;{student.Gender}</p>

                                    </div>


                                    {/* </div> */}
                                </div>


                                {/* <h5 className='parentsname' style={{ width: "22%" }}>Parents Details</h5>
                                    <br /> */}
                                <div style={{ display: "flex" }}>
                                    <h5 style={{ width: "22%" }}>Father Details</h5>
                                </div>
                                <div>
                                    <div class="row">

                                        <div class="col-md-4">
                                            <p>Father’s Name <span class="text-danger">:</span>&nbsp;&nbsp;{student.fatherName}</p>

                                        </div>

                                        <div class="col-md-4">
                                            {/* <p>Mother’s Name: <span class="text-danger">:</span></p>
                                            <input type="text" id="company" name="Mother_Name" value="" class="form-control" /> */}
                                            <p>Father’s Occupation <span class="text-danger">:</span>&nbsp;&nbsp;{student.fatheroccupation}</p>

                                        </div>

                                    </div>
                                    <br /> <div class="row">
                                        <div class="col-md-4">
                                            <p>Annual Income <span class="text-danger">:</span>&nbsp;&nbsp;{student.fatherIncome}</p>

                                        </div>

                                        <div class="col-md-4">
                                            <p>Office Phone No <span class="text-danger">:</span>&nbsp;&nbsp;{student.fatherPhone}</p>

                                        </div>

                                    </div>

                                    <br /> <div class="row">
                                        <div class="col-md-8">
                                            <p>Office Address <span class="text-danger">:</span>&nbsp;&nbsp;{student.fatherOaddress}</p>

                                        </div>

                                        <div class="col-md-6">

                                        </div>

                                    </div>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <h5 style={{ width: "24%" }}>Address Details</h5>
                                </div>

                                <br />  <div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <p>Address <span class="text-danger">:</span>&nbsp;&nbsp;{student.address}</p>


                                        </div>

                                        <div class="col-md-3">
                                            <p>Post Office <span class="text-danger">:</span>&nbsp;&nbsp;{student.postoffice}</p>

                                        </div>

                                        <div class="col-md-3">
                                            <p>Pincode <span class="text-danger">:</span>&nbsp;&nbsp;{student.pincode}</p>

                                        </div>

                                    </div>

                                    <div class="row">

                                        <div class="col-md-4">
                                            <p>Police Station <span class="text-danger">:</span>&nbsp;&nbsp;{student.policestation}</p>

                                        </div>

                                        <div class="col-md-6">
                                            <p>Municipality/Panchayat details <span class="text-danger">:</span>&nbsp;&nbsp;{student.municipality}</p>

                                        </div>

                                    </div>
                                </div>

                                <h5 style={{ width: "24%" }}>Contact Details</h5>
                                <br />

                                <div class="row">
                                    <div class="col-md-4">
                                        <p>Phone No <span class="text-danger">:</span>&nbsp;&nbsp;{student.StudentPhone}</p>
                                        <p></p>

                                    </div>

                                    <div class="col-md-4">
                                        <p>Alternate No : &nbsp;&nbsp;{student.AltNumber}</p>

                                    </div>

                                    <div class="col-md-4">
                                        <p>Email id <span class="text-danger">:</span>&nbsp;&nbsp;{student.StudentEmail}</p>

                                    </div>

                                </div>



                                <br />

                                <div style={{ display: "flex" }}>
                                    <h5 style={{ width: "24%" }}>Mother Details</h5>
                                </div>
                                <div>
                                    <div class="row">

                                        <div class="col-md-4">
                                            <p>Mother’s Name <span class="text-danger">:</span>&nbsp;&nbsp;{student.mothername}</p>

                                        </div>

                                        <div class="col-md-4">
                                            {/* <p>Mother’s Name: <span class="text-danger">:</span></p>
                                            <input type="text" id="company" name="Mother_Name" value="" class="form-control" /> */}
                                            <p>Mother’s Occupation <span class="text-danger">:</span>&nbsp;&nbsp;{student.motherOccupation}</p>

                                        </div>

                                    </div>
                                    <br /> <div class="row">
                                        <div class="col-md-4">
                                            <p>Annual Income <span class="text-danger">:</span>&nbsp;&nbsp;{student.motherIncome}</p>

                                        </div>

                                        <div class="col-md-4">
                                            <p>Office Phone No <span class="text-danger">:</span>&nbsp;&nbsp;{student.motherPhone}</p>

                                        </div>

                                    </div>

                                    <br /> <div class="row">
                                        <div class="col-md-8">
                                            <p>Office Address <span class="text-danger">:</span>&nbsp;&nbsp;{student.motherOaddress}</p>

                                        </div>

                                        <div class="col-md-6">

                                        </div>

                                    </div>
                                </div>

                                <br />

                                <div id="q1" class="q">
                                    <div style={{ display: "flex" }}>
                                        <h3 style={{ width: "34%" }}>Education Details</h3>
                                    </div>
                                    <div>
                                        <h5 style={{ width: "14%" }}>Class X</h5>


                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>Name of School<span class="text-danger">:</span>&nbsp;&nbsp;{student.xschool}</p>

                                            </div>

                                            <div class="col-md-4">
                                                <p>Name of Board/University<span class="text-danger">:</span>&nbsp;&nbsp;{student.xboard}</p>

                                            </div>

                                            <div class="col-md-4">
                                                <p>Marks Obtained (In Percentage)<span class="text-danger">:</span>&nbsp;&nbsp;{student.xmarks}</p>

                                            </div>

                                        </div>
                                        <br />

                                        <h5 style={{ width: "14%" }}>Class XII</h5>



                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>Name of School<span class="text-danger">:</span>&nbsp;&nbsp;{student.xiischool}</p>

                                            </div>

                                            <div class="col-md-4">
                                                <p>Name of Board/University<span class="text-danger">:</span>&nbsp;&nbsp;{student.xiiboard}</p>

                                            </div>

                                            <div class="col-md-4">
                                                <p>Marks Obtained (In Percentage)<span class="text-danger">:</span>&nbsp;&nbsp;{student.xiimarks}</p>

                                            </div>
                                        </div>
                                    </div>

                                    <br />

                                    <div style={{ display: "flex" }}>
                                        <h3 style={{ width: "37%" }}>Scholarship Details</h3>
                                    </div>


                                    <div>
                                        <div class="row">


                                            <div class="col-md-4">
                                                <p>Course opted for <span class="text-danger">:</span>&nbsp;&nbsp;{student.cof}</p>




                                            </div>


                                            <div class="col-md-4">
                                                <p>Name of college or university <span class="text-danger">:</span>&nbsp;&nbsp;{student.noc}</p>

                                            </div>


                                            <div class="col-md-4">
                                                <p>Are you the first to attend college from your family <span class="text-danger">:</span>&nbsp;&nbsp;{student.attclg}</p>

                                            </div>

                                        </div>
                                        <br />


                                        <div class="row">


                                            <div class="col-md-3" >
                                                <p class="heightadjust">Reason for seeking scholarship.<span class="text-danger">:</span>&nbsp;&nbsp;{student.ros}</p>

                                            </div>


                                            <div class="col-md-3">
                                                <p >Talk about a time you overcame a challenge.<span class="text-danger">:</span>&nbsp;&nbsp;{student.clng}</p>

                                            </div>


                                            <div class="col-md-3">
                                                <p>What are your strengths and weaknesses? <span class="text-danger">:</span>&nbsp;&nbsp;{student.str}</p>

                                            </div>

                                            <div class="col-md-3">
                                                <p>Current Education <br />Status <span class="text-danger">:</span>&nbsp;&nbsp;{student.ces}</p>

                                            </div>

                                        </div>
                                        <br />


                                        <div class="row">


                                            <div class="col-md-3">
                                                <p>I am a deserving candidate for the scholarship because ...(400 words)<span class="text-danger">:</span>&nbsp;&nbsp;{student.sb}</p>

                                            </div>


                                            <div class="col-md-3">
                                                <p>Are you availing of any other scholarship<span class="text-danger">:</span>&nbsp;&nbsp;{student.aos}</p>

                                            </div>



                                            <div class="col-md-3">
                                                <p class="heightadjust">Is there any other information you want to add? <span class="text-danger">:</span>&nbsp;&nbsp;{student.oia}</p>

                                            </div>


                                            <div class="col-md-3">
                                                <p class="heightadjust">How would you contribute towards improving or giving back to society in the future? <span class="text-danger">:</span>&nbsp;&nbsp;{student.fut}</p>

                                            </div>

                                        </div>
                                        <br />

                                    </div>


                                </div>

                                <div id="q2" class="q">

                                    <div style={{ display: "flex" }}>
                                        <h3 style={{ width: "36%" }}>Upload Documents</h3>
                                    </div>
                                    <div>
                                        <div class="row">
                                            {/* <div class="col-md-6">

                                                <p>Self-attested photograph of parents<br /></p>
                                                <p>
                                                    <img src={`http://${ipAddress}:8001/uploads/${files.photo}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                    
                                                </p>

                                            </div> */}

                                            <div class="col-md-6">
                                                <p>Permanent address proof</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.addProof}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}

                                                    {isImageFile(files.addProof) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.addProof}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.addProof);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.addProof}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>

                                            </div>

                                            <div class="col-md-4">
                                                <p>Income declaration</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.incomeDec}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.incomeDec) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.incomeDec}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.incomeDec);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                        <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                            <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                            <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.incomeDec}`} download >Download</a>
                                                        </div>
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                        <br />
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Father's ID Proof</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.fatheridproof}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}

                                                    {isImageFile(files.fatheridproof) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.fatheridproof}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.fatheridproof);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.fatheridproof}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>Mother's ID Proof</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.motheridproof}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}

                                                    {isImageFile(files.motheridproof) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.motheridproof}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.motheridproof);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.motheridproof}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>
                                            </div>





                                        </div>
                                        <br />
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Father's Bank Statement(Past 6 months)</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.fbankstatement}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.fbankstatement) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.fbankstatement}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.fbankstatement);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.fbankstatement}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>Mother's Bank Statement(Past 6 months)</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.mbankstatement}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.fbankstatement) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.mbankstatement}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.mbankstatement);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.mbankstatement}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>

                                            </div>



                                        </div>

                                        <br />

                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Student's bank account proof</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.studentbank}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.fbankstatement) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.studentbank}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.studentbank);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.studentbank}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>Adhaar card</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.adhar}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.adhar) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.adhar}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.adhar);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.adhar}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>

                                            </div>

                                        </div>
                                        <br />

                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Attested copies of mark sheet of all previous exams</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.marksheet}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.marksheet) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.marksheet}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.marksheet);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.marksheet}`} download >Download</a>
                                                            </div>
                                                            
                                                    )}
                                                </p>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Institution verification form</p>
                                                <p>
                                                    {isImageFile(files.fbankstatement) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.instituteverification}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.instituteverification);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                        <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                            <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                            <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.instituteverification}`} download >Download</a>
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                        </div>
                                        <br />

                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>Institute acceptance</p>

                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.Iacceptance}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.Iacceptance) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.Iacceptance}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.Iacceptance);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.Iacceptance}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>Fee structure of current course year wise</p>
                                                <p>
                                                    {/* <img src={`http://${ipAddress}:8001/uploads/${files.feestructure}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' /> */}
                                                    {isImageFile(files.feestructure) === true ? (

                                                        <div class="imagedownload-container">
                                                            <img src={`http://${ipAddress}:8001/uploads/${files.feestructure}`} style={{ borderRadius: "50%", width: "8em" }} alt='img1' />
                                                            <button class="downloadimage-button btn btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                getimage(files.feestructure);
                                                            }}>Download</button>
                                                        </div>
                                                    ) : (
                                                            <div class="imagedownload-container" style={{ width: "50px", height: "50px" }}>
                                                                <img src='assets/img/pdf.png' alt='h1' style={{ width: "100%" }} />
                                                                <a class="downloadimage-button btn btn-primary mail-button" href={`http://${ipAddress}:8001/uploads/${files.feestructure}`} download >Download</a>
                                                            </div>
                                                    )}
                                                </p>

                                            </div>

                                        </div>
                                        <br />

                                        <div class="row">
                                            



                                        </div>
                                    </div>
                                    <br />




                                </div>

                            </form>

                        </div>

                    </div>

                    :
                    <div style={{ textAlign: "center", color: "red" }}>
                        <h5>No Data</h5>
                    </div>

            }
        </>
    )
}

export default Viewform