import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./table.css";
import ipAddress from '../ipconfig';

import { setphonestatus, setName, setGrade, setMarks, setEmailstatus, setColor, setModal, setEducation, setPhone, setEmail } from '../actions/mentorActions';
import axios from 'axios';

const Studentbycollegeverification = (props) => {
  const [comments, setComments] = useState("");
  const [nameedit, setNameedit] = useState("");
  const [phoneedit, setPhoneedit] = useState(null);
  const [marksedit, setMarksedit] = useState(null);
  const [gradeedit, setGradeedit] = useState("");
  const [emailedit, setEmailedit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const phone = useSelector((state) => state.mentor.stat);
  const name = useSelector((state) => state.mentor.name);
  const grade = useSelector((state) => state.mentor.grade);
  const marks = useSelector((state) => state.mentor.marks);
  const email = useSelector((state) => state.mentor.emailstatus);
  const modal = useSelector((state) => state.mentor.modal);

  console.log(phone);

  const dispatch = useDispatch()
  const color = useSelector((state) => state.mentor.color);


  const user = props.student;
  const colid = props.colId;
  const stuid = props.stuId;

  // console.log(stuid);

  const date = new Date();
  const datenow = date.toISOString().slice(0, 19).replace('T', ' '); // Formats as 'YYYY-MM-DD HH:MM:SS'

  // Use 'formattedDate' in your SQL query.


  const role = localStorage.getItem('processNo');
  console.log(name, phone, grade, marks, email, comments, colid, stuid);
  console.log(phoneedit, emailedit);
  console.log(typeof(phone));

  async function firstAprove() {
    const confirmSubmit = window.confirm("Do you want to submit?");

    if (confirmSubmit) {
      if (name === null, phone === null, grade === null, marks === null, comments === '') {
        return alert("Please Check the Mandatory Field");
      }
      // else if (nameedit.length > 0 && name === "1") {
      //   console.log(1);
      //   alert("Please Clear the Update Field and Submit");
      // }
      // else if (emailedit.length > 0 && email === "1") {
      //   console.log(2);
      //   alert("Please Clear the Update Field and Submit");
      // }
      // else if ((phoneedit !== null && phoneedit !== "" )&& phone === "1") {
      //   console.log(3);
      //   alert("Please Clear the Update Field and Submit");
      // }
      // else if ((marksedit !== null && marksedit !== "") && marks === "1") {
      //   console.log(4);
      //   alert("Please Clear the Update Field and Submit");
      // }
      // else if (gradeedit.length > 0 && grade === "1") {
      //   console.log(5);
      //   alert("Please Clear the Update Field and Submit");
      // }
      else if (phone !== '1' && phoneedit !== null && phoneedit.length !== 10) {
        console.log(6);
        alert("Please Enter a Valid Phone Number");
      }
      else if (phone !== null && (phoneedit !== null && phoneedit !== "") && phoneedit.length !== 10) {
        console.log(7);
        alert("Please Enter a Valid Phone Number");
      }
      else if (email !== '1' && emailedit !== '' && !emailedit.includes("@")) {
        console.log(8);
        alert("Please Enter a Valid Email");
      }
      else if (email !== null && emailedit !== '' && !emailedit.includes("@")) {
        console.log(9);
        alert("Please Enter a Valid Email");
      }
    
      else {

        setIsLoading(true);
        const response = await axios.post(`http://${ipAddress}:8000/users/firstAprove`, {
          dbmode: 1, colId: colid, stuId: stuid, sname: name, sphone: phone, sgrade: grade, smarks: marks, semail: email, cmnt1: comments, roleid: role, comment2: "nothing", fapprove: null, sec_userid: null, fdate: datenow, finaldate: '2023-10-10'
        });

        const response2 = await axios.post(`http://${ipAddress}:8000/users/updatefirstAprove`, {
          stuId: stuid, name: name === '1' ? '' : nameedit, phone: phone === '1' ? null : phoneedit, grade: grade === '1' ? '' : gradeedit, marks: marks === '1' ? null : marksedit, email: email === '1' ? '' : emailedit
        });

        setIsLoading(false);
        // props.onSubmission();
        console.log(response);
        console.log(response2);

        if (response.status === 200 && response2.status === 200) {
          window.alert("Submission successful!");
          dispatch(setColor(!color));
          dispatch(setModal(false));
        }
      }

    } else {
      return null;
    }
  }

  useEffect(() => {

  }, [name, phone, grade, marks, email])

  return (
    <React.Fragment>
      {modal &&
        <div className='overlay'>

          {isLoading && (
            <div className="loading-container">
              <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
            </div>
          )}

          <div className='container modal-container'>
            <button type="button" class="btn-close" style={{ width: "3em", height: "3em" }} onClick={() => {
              dispatch(setModal(false));
              dispatch(setName(null));
              dispatch(setPhone(null));
              dispatch(setGrade(null));
              dispatch(setMarks(null));
              dispatch(setEmailstatus(null));

            }}></button>
            <table class="table table-success table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope='col'></th>
                  <th className='tableheading' scope="col">Yes</th>
                  <th className='tableheading' scope="col">No</th>
                  <th scope="col"></th>

                </tr>
              </thead>
              <tbody>

                {user.map((verificationItem, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className='tableheading'>Name</td>
                      <td className='tabledata'>{verificationItem.studentname}</td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio1" name="optradio" value={1} onChange={(e) => dispatch(setName(e.target.value))}
                          />
                        </div>

                      </td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio2" name="optradio" value={0} onChange={(e) => dispatch(setName(e.target.value))}
                          />
                        </div>
                      </td>
                      <td>
                        <input type='text' style={{ borderRadius: "10px", border: "none", padding: "5px" }} placeholder='Update' disabled={name === '1' || name === null} onChange={(e) => setNameedit(e.target.value)} />
                      </td>
                    </tr>
                    <tr>
                      <td className='tableheading'>Phone</td>
                      <td className='tabledata' style={{ maxWidth: "215px" }}>{verificationItem.studentphone}</td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio3" name="optradio2" value={1} onChange={(e) => dispatch(setphonestatus(e.target.value))} />
                        </div>

                      </td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio4" name="optradio2" value={0} onChange={(e) => dispatch(setphonestatus(e.target.value))} />
                        </div>
                      </td>
                      <td>
                        <input type='number' style={{ borderRadius: "10px", border: "none", padding: "5px" }} placeholder='Update' disabled={phone === '1' || phone === null} onChange={(e) => setPhoneedit(e.target.value)} onKeyPress={(e) => {
                          if (e.key === 'e' || e.key === 'E') {
                            e.preventDefault(); // Prevent 'e' key from being entered
                          }
                        }} maxLength={10} />
                      </td>
                    </tr>
                    <tr>
                      <td className='tableheading'>Grade</td>
                      <td className='tabledata' style={{ maxWidth: "215px" }}>{verificationItem.grade}</td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio5" name="optradio3" value={1} onChange={(e) => dispatch(setGrade(e.target.value))} />
                        </div>

                      </td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio6" name="optradio3" value={0} onChange={(e) => dispatch(setGrade(e.target.value))} />
                        </div>
                      </td>
                      <td>
                        <input type='text' style={{ borderRadius: "10px", border: "none", padding: "5px" }} placeholder='Update' disabled={grade === '1' || grade === null} onChange={(e) => setGradeedit(e.target.value)} />
                      </td>
                    </tr>
                    <tr>
                      <td className='tableheading'>Marks</td>
                      <td className='tabledata' style={{ maxWidth: "215px" }}>{verificationItem.studentmarks}</td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio7" name="optradio4" value={1} onChange={(e) => dispatch(setMarks(e.target.value))} />
                        </div>

                      </td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio8" name="optradio4" value={0} onChange={(e) => dispatch(setMarks(e.target.value))} />
                        </div>
                      </td>
                      <td>
                        <input type='number' style={{ borderRadius: "10px", border: "none", padding: "5px" }} placeholder='Update' disabled={marks === '1' || marks === null} onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                          setMarksedit(numericValue)
                        }} onKeyPress={(e) => {
                          if (e.key === 'e' || e.key === 'E') {
                            e.preventDefault(); // Prevent 'e' key from being entered
                          }
                        }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className='tableheading'>Email</td>
                      <td className='tabledata' style={{ maxWidth: "215px", overflowX: "scroll" }}>{verificationItem.email}</td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio9" name="optradio5" value={1} onChange={(e) => dispatch(setEmailstatus(e.target.value))} />
                        </div>

                      </td>
                      <td>
                        <div class="form-check">
                          <input type="radio" class="form-check-input" id="radio10" name="optradio5" value={0} onChange={(e) => dispatch(setEmailstatus(e.target.value))} />
                        </div>
                      </td>
                      <td>
                        <input type='text' style={{ borderRadius: "10px", border: "none", padding: "5px" }} placeholder='Update' disabled={email === '1' || email === null} onChange={(e) => setEmailedit(e.target.value)} />
                      </td>
                    </tr>

                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <label className='tableheading'>Comments<span style={{ marginLeft: "10px", color: "red" }}>*</span></label>
            <textarea type="text" style={{ height: "150px" }} placeholder='Enter your Comments' onChange={(e) => setComments(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" class="btn btn-danger" onClick={() => {
                dispatch(setModal(false));
                dispatch(setName(null));
                dispatch(setPhone(null));
                dispatch(setGrade(null));
                dispatch(setMarks(null));
                dispatch(setEmailstatus(null));
              }}>Cancel</button>
              <button type="button" class="btn btn-primary" disabled={isLoading} onClick={firstAprove}>Submit</button>
            </div>
          </div>

        </div>
      }
    </React.Fragment>
  )
}

export default Studentbycollegeverification;