import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import axios from 'axios';
import PhotoCapture from './camera';
import CryptoJS from 'crypto-js';
import withAuth from '../withauth';
import ipAddress from "../ipconfig.js"

import { useSelector, useDispatch } from 'react-redux'

import { setEmail, setFname, setLname, setDate, setRole, setIsCameraOn, setPhone, setEducation, setStream, setAdd, setPosition, setExperience, setLastcom, setGender, setOther, setCapturedPhoto, setUserno, setAlldetails } from '../actions/mentorActions';

import { setEditPhoto, setEditEducation, setEditPhone, setEditAdd, setEditAlldetails, setEditCapturedPhoto, setEditDate, setEditExperience, setEditGender, setEditIsCameraOn, setEditLastcom, setEditOther, setEditPosition, setEditRole, setEditStream, setEditUserno, setEditFname, setEditLname } from '../actions/mentoredit';

const Mentor = () => {

  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [userRole, setUserRole] = useState([]);
  const [userid, setUserid] = useState(null);
  const [userRolename, setUserRolename] = useState([]);
  const secretKey = 'yourSecretKeyHere';


  // const userRolename = [];
  //  console.log(userRolename);

  const email = useSelector((state) => state.mentor.email);
  const fname = useSelector((state) => state.mentor.fname);
  const lname = useSelector((state) => state.mentor.lname);
  const date = useSelector((state) => state.mentor.date);
  const role = useSelector((state) => state.mentor.role);
  const isCameraOn = useSelector((state) => state.mentor.isCameraOn);
  const phone = useSelector((state) => state.mentor.phone);
  const education = useSelector((state) => state.mentor.education);
  const stream = useSelector((state) => state.mentor.stream);
  const add = useSelector((state) => state.mentor.add);
  const position = useSelector((state) => state.mentor.position);
  // const photo = useSelector((state) => state.mentor.photo);
  const experience = useSelector((state) => state.mentor.experience);
  const lastcom = useSelector((state) => state.mentor.lastcom);
  const gender = useSelector((state) => state.mentor.gender);
  const other = useSelector((state) => state.mentor.other);
  const capturedPhoto = useSelector((state) => state.mentor.capturedPhoto);
  const userno = useSelector((state) => state.mentor.userno);
  const count = useSelector((state) => state.counter.value)
  const alldetails = useSelector((state) => state.mentor.alldetails);


  const phoneEdit = useSelector((state) => state.mentorEdit.phoneEdit);
  const educationEdit = useSelector((state) => state.mentorEdit.educationEdit);
  const streamEdit = useSelector((state) => state.mentorEdit.streamEdit);
  const addEdit = useSelector((state) => state.mentorEdit.addEdit);
  const positionEdit = useSelector((state) => state.mentorEdit.positionEdit);
  const photoEdit = useSelector((state) => state.mentorEdit.photoEdit);
  const experienceEdit = useSelector((state) => state.mentorEdit.experienceEdit);
  const lastcomEdit = useSelector((state) => state.mentorEdit.lastcomEdit);
  const genderEdit = useSelector((state) => state.mentorEdit.genderEdit);
  const otherEdit = useSelector((state) => state.mentorEdit.otherEdit);

  //  console.log(userRole);
  const dispatch = useDispatch()

  async function decryptedData() {
    try {
      const auth = localStorage.getItem("userAuth");
      if (!auth) {
        //console.error('Empty data for decryption');
        return;
      }

      const decryptedBytes = CryptoJS.AES.decrypt(auth, secretKey);


      if (decryptedBytes.sigBytes <= 0) {
        //console.error('Decryption unsuccessful');
        return;
      }

      const data = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(data);
      setUserRole(JSON.parse(data))
      //  console.log("after", userRole);
      setUserid(parseInt(userRole.userId,10));
      //  console.log(userid);
      //  console.log(parseInt(userid,10));
      
      // fetchuserdetail(userid);
      ////  console.log(data);
      ////  console.log('Data stored in localStorage');
    } catch (error) {
      //console.error('Error decrypting data:', error);
    }
  }


  ////  console.log("userrole", userRole);
  ////  console.log("email", typeof(email));

  ////  console.log(phone);

  const formData = new FormData();
  formData.append("photo", photo);

  const handleSubmit = async (e) => {

    e.preventDefault();
    ////  console.log(phone, education, stream, photo, other, add, experience, position, lastcom, gender);
    try {
      if ((phone === "" || phone.length !== 10) || education === "" || stream === "" || add === "" || position === "" || !photo || experience === "" || lastcom === "" || gender === "" || other === "") {
        alert("Please Check the Mandatory Input Field ")
      } else {
        const response = await axios.post(`http://${ipAddress}:8000/users/userdetails`, {
          mode: 1, mid: userid, mobile: phone, hedu: education, strm: stream, address: add, posi: position, exp: experience, lastcompany: lastcom, gndr: gender, oth: other
        });
        ////  console.log(response);

        const postdata = await axios.post(
          `http://${ipAddress}:8000/profilephoto/uploadprofile?userid=${userid}&mode=${1}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the correct content type for FormData
            },
          }
        ).then(res => { alert("Image Saved Successfully"); }).then(() => setPhoto(null));
        ////  console.log(postdata);
        // ////  console.log(data.data);

        // Check the status code from the response
        if (response.data === 409) {
          alert("This User is Already Registered");
        } else if (response.status === 200) {
          // If the role was created successfully, reset the form
          dispatch(setPhone(''));
          dispatch(setEducation(''));
          dispatch(setStream(''));
          dispatch(setAdd(''));
          dispatch(setPosition(''));
          dispatch(setExperience(''));
          dispatch(setLastcom(''));
          dispatch(setGender(''));
          dispatch(setOther(''));
          setSelectedEmail(null);
          dispatch(setFname(''));
          dispatch(setLname(''));
          dispatch(setRole(''));
          dispatch(setDate(''));

          alert("User Registered successfully");
        } else {
          // Handle other status codes if needed
          ////  console.log(response);
        }
        if (postdata.status === 200) {
          setPhoto(null);
          // Clear the captured photo state in the Redux store
          dispatch(setCapturedPhoto(null));

          // Clear the selected role
          dispatch(setUserno(''));

          alert("Profile set Successfully");
        } else {
          // Handle other status codes if needed
          ////  console.log(postdata);
        }
        setSelectedEmail(null)
        dispatch(setFname(''));
        dispatch(setLname(''));
        dispatch(setRole(''));
        dispatch(setDate(''));
        setFormSubmitted(true);
      }


    } catch (error) {
      //console.error(error);
      // Handle errors, show error message to the user, etc.
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (
  //       phone === "" ||
  //       phone.length !== 10 ||
  //       education === "" ||
  //       stream === "" ||
  //       add === "" ||
  //       position === "" ||
  //       !photo ||
  //       experience === "" ||
  //       lastcom === "" ||
  //       gender === "" ||
  //       other === ""
  //     ) {
  //       alert("Please Check the Mandatory Input Field ");
  //       return; // Exit the function early if validation fails
  //     }

  //     const response = await axios.post(
  //       'http://${ipAddress}:8000/users/userdetails',
  //       {
  //         mid: userno,
  //         mobile: phone,
  //         hedu: education,
  //         strm: stream,
  //         address: add,
  //         posi: position,
  //         exp: experience,
  //         lastcompany: lastcom,
  //         gndr: gender,
  //         oth: other,
  //       }
  //     );

  //     ////  console.log(response);

  //     // Check the status code from the response
  //     if (response.data === 409) {
  //       alert("This User is Already Registered");
  //     } else if (response.status === 200) {
  //       // If the user was registered successfully, clear form fields and photo in Redux store
  //       dispatch(setPhone(''));
  //       dispatch(setEducation(''));
  //       dispatch(setStream(''));
  //       dispatch(setAdd(''));
  //       dispatch(setPosition(''));
  //       dispatch(setExperience(''));
  //       dispatch(setLastcom(''));
  //       dispatch(setGender(''));
  //       dispatch(setOther(''));
  //       setSelectedGender(null);
  //       setSelectedEmail(null);
  //       dispatch(setFname(''));
  //       dispatch(setLname(''));
  //       dispatch(setRole(''));
  //       dispatch(setDate(''));
  //       setFormSubmitted(true);

  //       ////  console.log(phone, education, stream, add, gender, other);
  //       // Alert the user
  //       alert("User Registered successfully");
  //     } else {
  //       // Handle other status codes if needed
  //       ////  console.log(response);
  //     }

  // // Clear the captured photo state in the Redux store
  // dispatch(setCapturedPhoto(null));

  // // Clear the selected role
  // dispatch(setUserno(''));

  //     // Clear the form data in local state (if needed)
  //     // setPhone('');
  //     // setEducation('');
  //     // setStream('');
  //     // setAdd('');
  //     // setPosition('');
  //     // setExperience('');
  //     // setLastcom('');
  //     // setGender('');
  //     // setOther('');
  //   } catch (error) {
  //     //console.error(error);
  //     // Handle errors, show error message to the user, etc.
  //   }
  // };



  const handleCameraButtonClick = () => {
    dispatch(setIsCameraOn(true));
  };
  const handleRecaptureButtonClick = () => {
    setIsCameraOn(true);
    setCapturedPhoto(null); // Clear the previously captured photo
  };

  const handleCloseButtonClick = () => {
    dispatch(setIsCameraOn(false));
  };

  async function fetchRole() {
    try {
      const response = await axios.get(`http://${ipAddress}:8000/users/fetchusers`);
      // ////  console.log(response.data);
      // Assuming the server response is correct, and accessList is a valid JSON string
      // const accesslist = JSON.parse(data.accessList);

      dispatch(setEmail(response.data));
      // setSelectedPages2(accesslist);
      ////  console.log('Data received:', response.data);
      return response;
    } catch (error) {
      //console.error('Error fetching role:', error);
    }
  }

  async function fetchuserdetail(id) {
    try {
      const response = await axios.get(`http://${ipAddress}:8000/users/fetchuserdetails?roleid=${id}`);
      ////  console.log(response.data);

      if (response.data) {
        // Assuming response.data is an object containing properties: firstname, lastname, roleName, and creationDate
        dispatch(setFname(response.data[0].firstname));
        dispatch(setLname(response.data[0].lastname));
        dispatch(setEmail(response.data[0].userEmail));
        dispatch(setRole(response.data[0].roleName));
        dispatch(setUserno(response.data[0].userId))
        dispatch(setDate(response.data[0].creationDate));
        ////  console.log(date, role, fname, lname);
      } else {
        // Handle the case when response.data is undefined or empty
        //console.error('Empty response data for the specified roleid:', id);
      }

      return response;
    } catch (error) {
      //console.error('Error fetching role:', error);
    }
  }

  // const handleRoleSelect = (event) => {
  //   const selectedRoleId = event.target.value;
  //   setSelectedEmail(selectedRoleId);
  //   fetchuserdetail(selectedRoleId);
  // };

  const handleCaptureAndSave = (capturedPhoto) => {
    setPhoto(capturedPhoto);
    dispatch(setIsCameraOn(false)); // After saving the photo, close the camera
    dispatch(setCapturedPhoto(null));
  };


  async function fetchuseralldetails() {
    // const userid =await localStorage.getItem('userid');

    const response = await axios.get(`http://${ipAddress}:8000/users/fetchuseralldetails?userId=${userid}`);
    ////  console.log("alldetails 306", alldetails);

    if (response.status === 200) {
      dispatch(setAlldetails(response.data));
      ////  console.log("alldetails", alldetails);
    } else {
      // dispatch(setAlldetails(null));
      return null;
    }


  }

  async function updateuserdata() {
    try {
      // //  console.log("clicked update");
      const response = await axios.post(`http://${ipAddress}:8000/users/userdetails`, {
        mode: 2,
        mid: userid,
        mobile: phone,
        hedu: education,
        strm: stream,
        address: add,
        posi: position,
        exp: experience,
        lastcompany: lastcom,
        gndr: gender,
        oth: other
      });

      //  console.log(response.data);

      if (photo) {
        const formData = new FormData();
        formData.append("photo", photo);

        await axios.post(
          `http://${ipAddress}:8000/profilephoto/uploadprofile?userid=${userno}&mode=${2}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Image updated successfully");
        setPhoto(null);
      }
      
      alert("Data updated successfully");

      dispatch(setPhone(null));
      dispatch(setEducation(''));
      dispatch(setStream(''));
      dispatch(setAdd(''));
      dispatch(setPosition(''));
      dispatch(setExperience(''));
      dispatch(setLastcom(''));
      dispatch(setGender(''));
      dispatch(setOther(''));
      setSelectedEmail(null);
      dispatch(setFname(''));
      dispatch(setLname(''));
      dispatch(setRole(''));
      dispatch(setDate(''));
      dispatch(setEditPhone(false));
      dispatch(setEditEducation(false));
      dispatch(setEditStream(false));
      dispatch(setEditAdd(false));
      dispatch(setEditPosition(false));
      dispatch(setEditExperience(false));
      dispatch(setEditLastcom(false));
      dispatch(setEditGender(false));
      dispatch(setEditOther(false));
    } catch (error) {
      //console.error("Error:", error);
      // Handle error here
    }
  }


  ////  console.log(alldetails);
  ////  console.log(photoEdit);
  ////  console.log(isCameraOn);

  useEffect(() => {

    decryptedData();
    

    fetchRole();
    if (userid) {
      fetchuserdetail(userid);
      fetchuseralldetails();
    }
    
    

    ////  console.log(formSubmitted);


    // //  console.log("data", phone, education, stream, position, experience, add, lastcom, gender, other);
  }, [phone, education, stream, position, experience, add, lastcom, gender, other, userid, educationEdit]);

  useEffect(() => {
    localStorage.setItem('menuProcessNo', 1);
  },[])


  return (
    <div>
      <Navbar />

      <Sidebar />

      <main id="main" class="main" style={{ marginLeft: "240px", position: "relative" }}>

        <div class="container" style={{ width: "70%", padding: "40px", position: "relative", top: "80px", boxShadow: "1px -1px 9px 3px #a3a3a3" }}>
          <div className='row line'>
            <div className='col-md-6' style={{ alignSelf: "center" }}>
              <div class="title">Update User Profile</div>
            </div>
            <div className='col-md-6'>
              <div class="wrapper" style={{ display: 'flex', justifyContent: alldetails && alldetails.length > 0 ? 'center' : 'space-between' }}>

                {alldetails && alldetails.length > 0 ? (
                  photoEdit ? (
                    isCameraOn ? (
                      <div>
                        <i className="bi bi-x-octagon-fill" onClick={handleCloseButtonClick}></i>
                        <PhotoCapture onCapture={handleCaptureAndSave} />
                      </div>
                    ) : (
                      <>
                        <div className="rounded-frame">
                          <img
                            src={photo ? URL.createObjectURL(photo) : 'assets/img/d-img.png'}
                            className="image--cover"
                            alt="img-cover"
                          />
                        </div>
                        <div className="button-box">
                          <button className="btn btn-primary" style={{ border: "2px solid #6a4b4b" }} onClick={handleCameraButtonClick}>
                            Start Camera
                          </button>

                          <label className="btn btn-success" style={{ border: "2px solid #6a4b4b", cursor: 'pointer' }}>
                            Upload Photo
                            <input
                              type="file"
                              style={{ display: "none" }}
                              onChange={(e) => setPhoto(e.target.files[0])}
                            />
                          </label>
                        </div>
                      </>
                    )
                  ) : (
                    <img
                      src={`http://${ipAddress}:8000/uploads/${alldetails[0].profilepic}`}
                      style={{ borderRadius: "50%", width: "8em" }}
                      alt="img1"
                    />
                  )
                ) : isCameraOn ? (
                  <div>
                    <i className="bi bi-x-octagon-fill" onClick={handleCloseButtonClick}></i>
                    <PhotoCapture onCapture={handleCaptureAndSave} />
                  </div>
                ) : (
                  <div className="rounded-frame">
                    <img
                      src={photo ? URL.createObjectURL(photo) : 'assets/img/d-img.png'}
                      className="image--cover"
                      alt="img-cover"
                    />
                  </div>
                )}
                {!isCameraOn && alldetails.length === 0 && (
                  <div className="button-box">
                    <button className="btn btn-primary" style={{ border: "2px solid #6a4b4b" }} onClick={handleCameraButtonClick}>
                      Start Camera
                    </button>

                    <label className="btn btn-success" style={{ border: "2px solid #6a4b4b", cursor: 'pointer' }}>
                      Upload Photo
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </label>
                  </div>
                )}

                {alldetails && alldetails.length > 0 ? (
                  <span class="text-primary" style={{ marginLeft: "20px" }}>
                    {photoEdit ? (
                      <i
                        class="bi bi-x-circle-fill"
                        onClick={() => dispatch(setEditPhoto(false))} // Toggle the editing state
                      ></i>
                    ) : (
                      <i class="bi bi-pen-fill" onClick={() => dispatch(setEditPhoto(true))}></i>
                    )}
                  </span>
                ) : (
                  <span class="text-danger">*</span>
                )}


              </div>
            </div>
          </div>

          {/* <form action="#"></form> */}
          <form action="#" style={{ marginTop: "50px" }}>
            <div class="user__details">
              <div className='row' style={{
                width: "100%",
                background: "white"
              }}>
                <div className='col-md-6 m-col'>

                  <div class="input__box">
                    <span class="details">Email Address</span>

                    {alldetails && alldetails.length > 0 ? (
                      <p>{alldetails[0].userEmail}</p>
                    ) : (
                        <p>{userRole.length !== 0 ?  userRole.userEmail  : JSON.stringify(email)}</p>

                    )}


                  </div>
                  <div class="input__box">
                    <span class="details">Full Name</span>
                    {alldetails && alldetails.length > 0 ? (
                      <p>{alldetails[0].firstname} {alldetails[0].lastname}</p>
                    ) : (
                      <p>{userRole.firstname} {userRole.lastname}</p>
                    )}


                  </div>
                  <div class="input__box">
                    <span class="details">Role</span>
                    {alldetails && alldetails.length > 0 ? (
                      <p>{alldetails[0].roleName}</p>
                    ) : (
                        <p>{userRole.length !== 0 ?
                          
                            userRole.roleName.map((role, index) => (
                              <span key={index}>
                                {role.rolename}
                                {index < userRole.roleName.length - 1 ? ', ' : ''}
                              </span>
                            ))
                           : ''}
                      </p>
                    )}
                  </div>


                  <div class="input__box">
                    <span class="details">Creation Date</span>
                    {alldetails && alldetails.length > 0 ? (
                      <p>{alldetails[0].creationDate}</p>
                    ) : (
                        <p>{ userRole.length !== 0 ? userRole.creationDate : ''}</p>
                    )}

                  </div>
                </div>
                <div className='col-md-6  m-col2'>
                  <div class="input__box">

                    <span class="details">Phone Number
                      {alldetails && alldetails.length > 0 ? (
                        <span class="text-primary" style={{ marginLeft: "20px" }}>
                          {phoneEdit ? (
                            <i
                              class="bi bi-x-circle-fill"
                              onClick={() => dispatch(setEditPhone(false))} // Toggle the editing state
                            ></i>
                          ) : (
                            <i
                              class="bi bi-pen-fill"
                              onClick={() => {

                                dispatch(setEditPhone(true));
                                dispatch(setPhone(alldetails[0].phone))
                              }}
                            ></i>
                          )}
                        </span>
                      ) : (
                        <span class="text-danger">*</span>
                      )}
                    </span>

                    {alldetails && alldetails.length > 0 ? (
                      phoneEdit ? (
                        <input
                          type="number"
                          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                          value={phone}
                          placeholder="0123456789"
                          required
                          onChange={(e) => dispatch(setPhone(e.target.value))}
                        />
                      ) : (
                        <p>{alldetails[0].phone}</p>
                      )
                    ) : (
                      <input
                        type="number"
                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                        value={phone}
                        placeholder="0123456789"
                        required
                        onChange={(e) => dispatch(setPhone(e.target.value))}
                      />
                    )}

                  </div>
                  <div class="input__box">
                    <span class="details">Higher Education Details {alldetails && alldetails.length > 0 ?

                      <span class="text-primary" style={{ marginLeft: "20px" }}>
                        {educationEdit ? (
                          <i
                            class="bi bi-x-circle-fill"
                            onClick={() => dispatch(setEditEducation(false))} // Toggle the editing state
                          ></i>
                        ) :
                          <i class="bi bi-pen-fill" onClick={() => {
                            dispatch(setEditEducation(true));
                            dispatch(setEducation(alldetails[0].HigherEducation))
                          }}></i>}
                      </span> :
                      <span class="text-danger">*</span>
                    }</span>

                    {alldetails && alldetails.length > 0 ? (
                      educationEdit ?
                        <input type="text" placeholder="e.g   B.Com , B.A" value={education} onChange={(e) => dispatch(setEducation(e.target.value))} required />
                        :
                        <p>{alldetails[0].HigherEducation}</p>
                    ) : (
                      <input type="text" placeholder="e.g   B.Com , B.A" value={education} onChange={(e) => dispatch(setEducation(e.target.value))} required />
                    )}
                  </div>
                  <div class="input__box">
                    <span class="details">Stream {alldetails && alldetails.length > 0 ?
                      (
                        <span class="text-primary" style={{ marginLeft: "20px" }}>
                          {streamEdit ? (
                            <i
                              class="bi bi-x-circle-fill"
                              onClick={() => dispatch(setEditStream(false))} // Toggle the editing state
                            ></i>
                          ) :

                            <i class="bi bi-pen-fill" onClick={() => { dispatch(setEditStream(true)); dispatch(setStream(alldetails[0].stream)) }}></i>
                          }
                        </span>) :
                      <span class="text-danger">*</span>
                    }</span>

                    {alldetails && alldetails.length > 0 ?
                      streamEdit ?
                        <input type="text" placeholder="e.g   Accounts Honours " value={stream} onChange={(e) => dispatch(setStream(e.target.value))} required />
                        : (
                          <p>{alldetails[0].stream}</p>
                        ) : (
                        <input type="text" placeholder="e.g   Accounts Honours " value={stream} onChange={(e) => dispatch(setStream(e.target.value))} required />
                      )}
                  </div>
                  <div class="input__box">
                    <span class="details">position {alldetails && alldetails.length > 0 ? (
                      <span class="text-primary" style={{ marginLeft: "20px" }}>
                        {positionEdit ? (
                          <i
                            class="bi bi-x-circle-fill"
                            onClick={() => dispatch(setEditPosition(false))} // Toggle the editing state
                          ></i>
                        ) : <i class="bi bi-pen-fill" onClick={() => { dispatch(setEditPosition(true)); dispatch(setPosition(alldetails[0].position)) }}></i>}
                      </span>) :
                      <span class="text-danger">*</span>
                    }</span>

                    {alldetails && alldetails.length > 0 ?
                      positionEdit ?
                        <input type="text" placeholder="e.g    In Company " value={position} onChange={(e) => dispatch(setPosition(e.target.value))} required />
                        :
                        (
                          <p>{alldetails[0].position}</p>
                        ) : (
                        <input type="text" placeholder="e.g    In Company " value={position} onChange={(e) => dispatch(setPosition(e.target.value))} required />
                      )}
                  </div>
                  <div class="input__box">
                    <span class="details">Experience {alldetails && alldetails.length > 0 ? (
                      <span class="text-primary" style={{ marginLeft: "20px" }}>
                        {experienceEdit ? <i
                          class="bi bi-x-circle-fill"
                          onClick={() => dispatch(setEditExperience(false))} // Toggle the editing state
                        ></i> : <i class="bi bi-pen-fill" onClick={() => { dispatch(setEditExperience(true)); dispatch(setExperience(alldetails[0].experience)) }}></i>}
                      </span>) :
                      <span class="text-danger">*</span>
                    }</span>

                    {alldetails && alldetails.length > 0 ?
                      experienceEdit ?
                        <input type="text" placeholder="e.g   In Neo Metaliks " value={experience} onChange={(e) => dispatch(setExperience(e.target.value))} required /> : (
                          <p>{alldetails[0].experience}</p>
                        ) : (
                        <input type="text" placeholder="e.g   In Neo Metaliks " value={experience} onChange={(e) => dispatch(setExperience(e.target.value))} required />
                      )}
                  </div>

                </div>
              </div>



            </div>
            <div className='row' style={{ padding: "0px 24px 12px 0" }}>
              <div className='col-md-6'>
                <div class="input__box">
                  <span class="details">Last Company Name {alldetails && alldetails.length > 0 ? (
                    <span class="text-primary" style={{ marginLeft: "20px" }}>
                      {lastcomEdit ? <i
                        class="bi bi-x-circle-fill"
                        onClick={() => dispatch(setEditLastcom(false))} // Toggle the editing state
                      ></i> : <i class="bi bi-pen-fill" onClick={() => { dispatch(setEditLastcom(true)); dispatch(setLastcom(alldetails[0].lastcompany)) }}></i>}

                    </span>) :
                    <span class="text-danger">*</span>
                  }</span>

                  {alldetails && alldetails.length > 0 ?
                    lastcomEdit ?
                      <input type="text" placeholder="e.g   In Neo Metaliks " value={lastcom} onChange={(e) => dispatch(setLastcom(e.target.value))} required /> : (
                        <p>{alldetails[0].lastcompany}</p>
                      ) : (
                      <input type="text" placeholder="e.g   In Neo Metaliks " value={lastcom} onChange={(e) => dispatch(setLastcom(e.target.value))} required />
                    )}
                </div>

              </div>
              <div className='col-md-6'>
                <div class="input__box">
                  <span class="details">Address {alldetails && alldetails.length > 0 ? (
                    <span class="text-primary" style={{ marginLeft: "20px" }}>
                      {addEdit ? <i
                        class="bi bi-x-circle-fill"
                        onClick={() => dispatch(setEditAdd(false))} // Toggle the editing state
                      ></i> : <i class="bi bi-pen-fill" onClick={() => { dispatch(setEditAdd(true)); dispatch(setAdd(alldetails[0].address)) }}></i>}

                    </span>) :
                    <span class="text-danger">*</span>
                  }</span>

                  {alldetails && alldetails.length > 0 ?
                    addEdit ?
                      <textarea class="form-control" name="Office_Address" id="OfficeAddress" value={add} onChange={(e) => dispatch(setAdd(e.target.value))}></textarea> : (
                        <p>{alldetails[0].address}</p>
                      ) : (
                      <textarea class="form-control" name="Office_Address" id="OfficeAddress" value={add} onChange={(e) => dispatch(setAdd(e.target.value))}></textarea>
                    )}
                </div>

              </div>
            </div>
            <div className='row' style={{ padding: "0px 24px 12px 0" }}>
              <div className='col-md-6'>
                <div class="input__box">
                  {/* <div class="gender__details" >
                    <input type="radio" name="gender" id="dot-1" value="male" checked={gender === "male"} onChange={(e) => {
                      dispatch(setGender(e.target.value));
                      setSelectedGender(e.target.value);
                    }} />
                    <input type="radio" name="gender" id="dot-2" value="female" checked={gender === "female"} onChange={(e) => {
                      dispatch(setGender(e.target.value));
                      setSelectedGender(e.target.value);
                    }} />
                    <span class="details">Gender</span>
                    <div class="category">
                      <label for="dot-1">
                        <span class="dot one"></span>
                        <span>Male</span>
                      </label>
                      <label for="dot-2">
                        <span class="dot two"></span>
                        <span>Female</span>
                      </label>

                    </div> */}

                  {alldetails && alldetails.length > 0 ?
                    genderEdit ?
                      (
                        <>
                          <div class="gender__details" >
                            <input type="radio" name="gender" id="dot-1" value="male" checked={gender === "male"} onChange={(e) => {
                              dispatch(setGender(e.target.value));
                              setSelectedGender(e.target.value);
                            }} />
                            <input type="radio" name="gender" id="dot-2" value="female" checked={gender === "female"} onChange={(e) => {
                              dispatch(setGender(e.target.value));
                              setSelectedGender(e.target.value);
                            }} />
                            <span class="details">Gender<span class="text-primary" style={{ marginLeft: "20px" }}></span><i
                              class="bi bi-x-circle-fill text-primary"
                              onClick={() => dispatch(setEditGender(false))} // Toggle the editing state
                            ></i> </span>
                            <div class="category">
                              <label for="dot-1">
                                <span class="dot one"></span>
                                <span>Male</span>
                              </label>
                              <label for="dot-2">
                                <span class="dot two"></span>
                                <span>Female</span>
                              </label>

                            </div>
                          </div>
                        </>
                      ) :
                      (
                        <>
                          <label>Gender  {alldetails && alldetails.length > 0 ? (
                            <span class="text-primary" style={{ marginLeft: "20px" }}>
                              {genderEdit ? <i
                                class="bi bi-x-circle-fill"
                                onClick={() => dispatch(setEditGender(false))} // Toggle the editing state
                              ></i> : <i class="bi bi-pen-fill" onClick={() => dispatch(setEditGender(true))}></i>}

                            </span>) :
                            <span class="text-danger">*</span>
                          }</label>
                          <p>{alldetails[0].gender}</p>
                        </>

                      ) : (
                      <>
                        <div class="gender__details" >
                          <input type="radio" name="gender" id="dot-1" value="male" checked={gender === "male"} onChange={(e) => {
                            dispatch(setGender(e.target.value));
                            setSelectedGender(e.target.value);
                          }} />
                          <input type="radio" name="gender" id="dot-2" value="female" checked={gender === "female"} onChange={(e) => {
                            dispatch(setGender(e.target.value));
                            setSelectedGender(e.target.value);
                          }} />
                          <span class="details">Gender </span>
                          <div class="category">
                            <label for="dot-1">
                              <span class="dot one"></span>
                              <span>Male</span>
                            </label>
                            <label for="dot-2">
                              <span class="dot two"></span>
                              <span>Female</span>
                            </label>

                          </div>
                        </div>
                      </>
                    )}

                </div>
              </div>
              <div className='col-md-6'>
                <div class="input__box">
                  <span class="details">Others {alldetails && alldetails.length > 0 ? (
                    <span class="text-primary" style={{ marginLeft: "20px" }}>
                      {otherEdit ? <i
                        class="bi bi-x-circle-fill"
                        onClick={() => dispatch(setEditOther(false))} // Toggle the editing state
                      ></i> : <i class="bi bi-pen-fill" onClick={() => { dispatch(setEditOther(true)); dispatch(setOther(alldetails[0].others)) }}></i>
                      }

                    </span>) :
                    <span class="text-danger">*</span>
                  }</span>

                  {alldetails && alldetails.length > 0 ?
                    otherEdit ?
                      <textarea class="form-control" value={other} name="Office_Address" id="OfficeAddress" onChange={(e) => dispatch(setOther(e.target.value))}></textarea>
                      :
                      (
                        <p>{alldetails[0].others}</p>
                      ) : (
                      <textarea class="form-control" value={other} name="Office_Address" id="OfficeAddress" onChange={(e) => dispatch(setOther(e.target.value))}></textarea>
                    )}
                </div>

              </div>
            </div>
            
          </form>
          {alldetails && alldetails.length > 0 ? (
            <button className='btn btn-primary' style={{ border: "2px solid #6a4b4b" }} onClick={updateuserdata}>Update</button>) :
            (<button className='btn btn-primary' style={{ border: "2px solid #6a4b4b" }} onClick={handleSubmit}>Save</button>)
          }
        </div>
      </main >
    </div>


  )
}

export default withAuth(Mentor);