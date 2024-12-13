import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { setAlldetails } from '../actions/mentorActions';
import { useSelector, useDispatch } from 'react-redux';
import "./table.css";
import ipAddress from '../ipconfig';
import PasswordModal from '../bootstrapcomp/passwordModal';
import { setResetPasswordModal } from '../actions/feesAction';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const [students, setStudents] = useState([]);
  const secretKey = 'yourSecretKeyHere';
  // const userauth = useSelector((state) => state.mentor.userauth);
  const functioncall = useSelector((state) => state.interview.functioncall);
  const alldetails = useSelector((state) => state.mentor.alldetails);
  // //  console.log(userRole);

  const logout = async () => {
    localStorage.removeItem("UserAuthToken");
    localStorage.removeItem("processNo");
    localStorage.removeItem("userAuth");
    navigate("/")
    window.location.reload();
  }

  const resetPasswordModal = useSelector((state) => state.studentFees.resetpasswordmodal);

  async function fetchstudent(clgId, stuId, dbmode) {

    const data = await fetch(`http://${ipAddress}:8000/users/readyforinterview?clgid=${clgId}&dbmod=${dbmode}&studentid=${stuId}`).then(res => res.json()).then(dataset => {
      setStudents(dataset);
      // //  console.log(dataset);
    });
  }

  async function decryptedData(value) {
    try {
      if (!value) {
        //console.error('Empty data for decryption');
        return;
      }

      const decryptedBytes = CryptoJS.AES.decrypt(value, secretKey);

      if (decryptedBytes.sigBytes <= 0) {
        //console.error('Decryption unsuccessful');
        return;
      }

      const data = decryptedBytes.toString(CryptoJS.enc.Utf8);
      setUserRole(JSON.parse(data))
      ////  console.log(data);
      ////  console.log('Data stored in localStorage');
    } catch (error) {
      //console.error('Error decrypting data:', error);
    }
  }

  async function fetchuseralldetails(userid) {

    const response = await axios.get(`http://${ipAddress}:8000/users/fetchuseralldetails?userId=${userid}`);
    ////  console.log("alldetails 306", alldetails);

    if (response.status === 200) {
      dispatch(setAlldetails(response.data));
      ////  console.log("alldetails", alldetails);
    }
    // else {
    //   // dispatch(setAlldetails(null));
    //   return null;
    // }
  }

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    const userId = localStorage.getItem("processNo");
    // //  console.log(userId);
    fetchstudent(userId, 0, 3);
    fetchuseralldetails(userId);
    decryptedData(auth)
    // ////  console.log(decryptedData);
    // setUserRole(decryptedData)

  }, [functioncall])

  return (
    <>
      {/* <header id="header" class="header fixed-top d-flex align-items-center" style={{ justifyContent: "space-between" }}>

        <div class="d-flex align-items-center justify-content-between">
          <a href="/home" class="logo d-flex align-items-center">
            <img src="assets/img/neologo.jpg" alt="" style={{ width: "64%", maxHeight: "none" }} />
          </a>
        </div>

        <div className='row' style={{ alignItems: "center", width: "40vw" }}>
          <div className='col-md-1 nav-item dropdown'>
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-bell" style={{ fontSize: '22px', position: 'relative' }}></i>
              <span class="badge bg-danger badge-number" style={{
                position: 'absolute', top: '-10px',
                left: '25px'
              }}>
                {students.length !== 0 ? students[0].rowcount : 0}
              </span>
            </a>

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" style={{
              position: 'absolute',
              inset: '0px 0px auto auto',
              margin: '0px',
              transform: 'translate(-12px, 35px)'
            }}>
              <li class="dropdown-header">
                You have <strong style={{ color: "black" }}>{students.length !== 0 ? students[0].rowcount : 0}</strong> new notifications&nbsp;&nbsp;
                <Link to={"/showInterview"}>
                  <button className='btn btn-success mail-button'>View all</button>
                </Link>
              </li>

            </ul>
          </div>
          <div className='col-md-7'>
            {userRole && <p><strong>Logged As </strong>{userRole.firstname} {userRole.lastname}</p>}
          </div>
          <div className='col-md-4'>
            <button className='btn btn-primary mail-button' onClick={logout}>Log Out</button>
          </div>
        </div>


      </header> */}

      {resetPasswordModal && <PasswordModal email={userRole.userEmail} userid={userRole.userId} />}

      <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center">
            <img src="assets/img/neologo.jpg" alt="" style={{ width: "64%", maxHeight: "none", margin: "5px" }} />
          </a>
        </div>

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">
            <li class="nav-item dropdown">

              <button class="nav-link nav-icon" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-bell" style={{ fontSize: '22px', position: 'relative' }}></i>
                <span class="badge bg-danger badge-number" style={{
                  position: 'absolute', top: '-10px',
                  left: '15px'
                }}>
                  {students.length !== 0 ? students[0].rowcount : 0}
                </span>
              </button>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" style={{
                position: 'absolute',
                inset: '0px 0px auto auto',
                margin: '0px',
                transform: 'translate(-12px, 35px)'
              }}>
                <li class="dropdown-header">
                  You have <strong style={{ color: "black" }}>{students.length !== 0 ? students[0].rowcount : 0}</strong> new notifications&nbsp;&nbsp;
                  <Link to={"/showInterview"}>
                    <button className='btn btn-success mail-button'>View all</button>
                  </Link>
                </li>

              </ul>

            </li>


            <li class="nav-item dropdown pe-3">

              <button class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={alldetails && alldetails.length > 0 ? `http://${ipAddress}:8000/uploads/${alldetails[0].profilepic}` : "assets/img/d-img.png"} alt="Profile" class="rounded-circle"/>
                <span class="d-none d-md-block dropdown-toggle ps-2">{userRole !== null ? userRole.firstname + ' ' + userRole.lastname : "K Anderson"}
                </span>
              </button>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  {userRole && <h6>{userRole.firstname} {userRole.lastname}</h6>}
                  {/* <span>Web Designer</span> */}
                  <p>{userRole !== null ?

                    userRole.roleName.map((role, index) => (
                      <span key={index}>
                        {role.rolename}
                        {index < userRole.roleName.length - 1 ? ', ' : ''}
                      </span>
                    ))
                    : ''}
                  </p>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link to={"/mentor"} class="dropdown-item d-flex align-items-center">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link class="dropdown-item d-flex align-items-center" onClick={()=> dispatch(setResetPasswordModal(true))}>
                    <i class="bi bi-person"></i>
                    <span>Reset Password</span>
                    {/* <button className='btn btn-info'>Reset Password</button> */}
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <button class="dropdown-item d-flex align-items-center" onClick={logout}>
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </button>
                </li>

              </ul>
            </li>

          </ul>
        </nav>

      </header>
    </>
  )
}

export default Navbar