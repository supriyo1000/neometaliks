import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./test.css";
import axios from 'axios';
import { setUserAuth } from './actions/mentorActions';
import CryptoJS from 'crypto-js';
import ipAddress from './ipconfig';

const Testlogin = () => {

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState('');
  const [path, setPath] = useState("");
  // const [st, setSt] = useState({ display: "none" });
  // const [remind, setRemind] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const secretKey = 'yourSecretKeyHere';
  const userauth = useSelector((state) => state.mentor.userauth);

  console.log(email);
  console.log(password);

  async function encryptedData(value) {
    try {
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
      console.log('Encrypted Data:', encryptedData);
      localStorage.setItem("userAuth", encryptedData);
      console.log('Data stored in localStorage');
    } catch (error) {
      console.error('Error encrypting data:', error);
    }
  }


  async function postdata(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${ipAddress}:8000/userlogin`, {
        username: email,
        pass: password
      });

      console.log(response);
      const value = response.data.response;

      if (response.status === 200) {

        encryptedData(value);
        if (value.status === 1) {

        }
        localStorage.setItem("processNo", value.userId);
        localStorage.setItem("UserAuthToken", response.data.token);
        dispatch(setUserAuth(true));
        navigate("/home");

      } else if (response.status === 204) {
        alert("Cannot Log IN. Contact Adminstrator");
      }
    } catch (error) {
      console.error(error);
      alert("Please Check your Email And Password");
    }
  }

  return (
    <>
      <div style={{
        position: 'fixed',
        height: '100vh !important'
      }}>
        <div className='row' style={{ alignItems: "center", width: "100%" }}>
          <div className='col-md-6'>
            <div className='bgcontainer'>
              <div className='bluebg'>

                <div className='logocontainer'>
                  <div className='neologo'>
                    <img src='assets/img/nlogo.png' alt='img1' />
                  </div>
                  <div className='text'>
                    <h4 style={{ color: "white" }}>WELCOME TO NEO METALIKS LTD</h4>
                    <p style={{ color: "white", fontWeight: "bold" }}>Siksha Samarth Program</p>
                  </div>
                </div><br />
                <img src='assets/img/trimg.png' className='design' alt='img1' />


                <div className='image' style={{ height: "55%", width: "40%" }}>
                  {/* <img src='assets/img/sg.jpg'/> */}
                  <img src='assets/img/c1img.png' alt='img1' style={{ width: "80%", height: "100%" }} />
                </div>
                <div className='bubble'>
                  {/* <img src='assets/img/bubble2.jpg'/> */}
                </div>
              </div>
              <div className='diagonal'></div>
            </div>
          </div>
          <div className='col-md-6' style={{
            display: "flex",
            justifyContent: "center",
          }}>

            <Link to={`http://${ipAddress}:4000`}>
              <div class="MuiBox-root css-1id64jh" style={{
                position: 'fixed', top: '20px',
                alignItems: 'center', right: '50px'
              }}>
                <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-oagsia" tabindex="0" type="button">Candidate Registration<span class="MuiTouchRipple-root css-w0pj6f"></span>
                </button>
              </div>
            </Link>

            <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d" style={{ width: "50%", height: "50%" }}><div class="MuiBox-root css-15m7mkq"><h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">Sign in</h4>
              <p class="MuiTypography-root MuiTypography-h4" style={{ color: "white", fontWeight: "bold" }}>NEO METALIKS LTD</p><div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-dp2bsp">

              </div><div>
                <h3>

                </h3>
              </div>
            </div>
              <div class="MuiBox-root css-1iu09ww">
                <form class="MuiBox-root css-1ircn5c" role="form">
                  <div class="MuiBox-root css-16pyyvj">
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                      {/* <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-1hiu5rg" data-shrink="false" for=":r13:" id=":r13:-label">Email</label> */}
                      <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                        <input aria-invalid="false" id=":r13:" type="email" placeholder="Email" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                          <legend class="css-yjsfm1">
                            <span>Email</span>
                          </legend>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div class="MuiBox-root css-16pyyvj">
                    <div class="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-16qtvyo">
                      {/* <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined css-1hiu5rg" data-shrink="false" for=":r14:" id=":r14:-label">Password</label> */}
                      <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-11fp4xj">
                        <input aria-invalid="false" id=":r14:" type="password" placeholder="Password" class="MuiInputBase-input MuiOutlinedInput-input css-1pvpzft" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-at8z4h">
                          <legend class="css-yjsfm1">
                            <span>Password</span>
                          </legend>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  {/* <div class="MuiBox-root css-oh6zk8">
                    <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1ew5r76">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1p7j3ll">
                        <input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" />
                        <span class="MuiSwitch-thumb css-t1qlxe"></span>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </span>
                      <span class="MuiSwitch-track css-1n5b6w8">

                      </span>
                    </span>
                    <span class="MuiTypography-root MuiTypography-button css-lr1e29">&nbsp;&nbsp;Remember me</span>
                  </div> */}
                  <div class="MuiBox-root css-1id64jh">
                    <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-oagsia" tabindex="0" type="button" onClick={postdata}>sign in<span class="MuiTouchRipple-root css-w0pj6f"></span>
                    </button>
                  </div>

                </form>
              </div>
            </div>
            <div className='mt-5' style={{ position: "absolute", bottom: "0", left: "50%", fontSize: "12px" }}>
              {/* <img src='qlogo.jpg' alt='qlogo' style={{ width: "90px" }} /> */}
              <p >Developed And Maintained By <strong>Quobotic Consulting Private Limited</strong></p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Testlogin;