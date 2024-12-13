
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import withAuth from '../withauth';
import Table from './table';
import ipAddress from "../ipconfig.js";
import Select from 'react-select';

const InputForm = () => {
  const [inputs, setInputs] = useState([{ collId: '', collegeName: '', collegeEmail: '', comments: '' }]);
  const [mailstate, setMailstate] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dis, setDis] = useState(false);
  const inputRef = useRef([]);
  const [colleges, setColleges] = useState([]);

  console.log(mailstate);
  console.log(colleges);

  async function fetchstatus() {
    const data = await fetch(`http://${ipAddress}:8000/users/emailstatus`).then(res => res.json()).then(dataset => setMsgs(dataset));
    return data;
  }

  async function fetchCollegeList() {
    const data = await fetch(`http://${ipAddress}:8000/users/get_college_list`).then(res => res.json()).then(dataset => setColleges(dataset));
  }


  console.log(inputs);

  const options = colleges.map((clg, i) => {
    return { value: { colid: clg.Coll_ID, colname: clg.collegename }, label: clg.collegename };
  });

 
  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: '13px', // Adjust the font size as needed
    }),
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...inputs];

    if (field === "comments") {
      // Enforce maximum character limit
      if (value.length <= 900) {
        updatedInputs[index][field] = value;
        setDis(false); // Clear the state to enable the input
      } else {
        // Truncate the value to 200 characters
        const truncatedValue = value.substring(0, 900);
        console.log(truncatedValue);
        updatedInputs[index][field] = truncatedValue;
        setDis(true); // Set the state to disable the input
      }
    } else {
      updatedInputs[index][field] = value;
    }

    setInputs(updatedInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { collegeName: '', collegeEmail: '', comments: '' }]);
  };

  const handleRemoveInput = (index) => {
    if (inputs[index].collegeName || inputs[index].collegeEmail || inputs[index].comments) {
      const result = window.confirm("This input has a value. Are you sure you want to remove it?");
      if (result) {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
      } else {
        return null;
      }
    } else {
      const updatedInputs = [...inputs];
      updatedInputs.splice(index, 1);
      setInputs(updatedInputs);
    }
  };

  const url = "http://103.184.242.25:3000/universityform";

  const gettoken = () => {
    const isAuthenticated = localStorage.getItem('UserAuthToken');
    return isAuthenticated;
  }

  const handleSendMail = async (coll_Id, email, clgname, cmnt, index) => {

    console.log(coll_Id, email, clgname, cmnt, index);

    const collId = `${coll_Id}`;

    console.log(typeof(collId));

    focusOnEmptyInput();

    // Prepare data in JSON format
    const jsonData = JSON.stringify({ collId: collId, collegeName: clgname, collegeEmail: email, comments: cmnt });
    console.log(jsonData); // Display JSON data in the console

    if (clgname.length === 0) {
      alert("Please select the College name!!")
    }
    else if (email.length === 0 || !email.includes("@")) {
      return null;
    }
    else if (cmnt.length === 0 || cmnt.length > 900) {
      return null;
      // alert("Please Check Your Comment"); 
    } else {

      setIsLoading(true);

      const response = await axios.post(`http://${ipAddress}:8000/users/collegemail`, {
        coll_Id: collId,
        link: url,
        account: email,
        clgsname: clgname,
        comments: cmnt
      }
        , {
          headers: {
            Authorization: `Bearer ${gettoken()}`
          }
        }
      );
      console.log("response is", response);
      if (response.status === 200) {
        // If the email was sent successfully
        setIsLoading(false);
        alert("Email sent successfully");
      } else if (response.status === 401) {
        setIsLoading(false);
        alert("Unauthorized");
      } else {
        setIsLoading(false);
        alert("Failed to send email");
      }

      const updatedInputs = [...inputs];
      updatedInputs[index].collId = '';
      updatedInputs[index].collegeName = '';
      updatedInputs[index].collegeEmail = '';
      updatedInputs[index].comments = '';
      setInputs(updatedInputs);
      setMailstate(!mailstate);
    };
  }


  const focusOnEmptyInput = (e) => {
    // e.preventDefault();

    let isEmptyField = false;

    for (let i = 1; i < inputRef.current.length; i++) {
      const input = inputRef.current[i];

      console.log('inputRef.current:', inputRef.current);
      console.log('input:', input);

      if ((input.name === "cmail" && (!input.value.includes("@") || input.value === ""))
        || (input.name === "comments" && (input.value.length > 200 || input.value === ""))) {
        isEmptyField = true;
        input.focus();
        input.style.backgroundColor = "antiquewhite";
        input.addEventListener("change", () => {
          input.style.backgroundColor = "white"; // Change the background color to white on change
        });
        break;
      }
    }

    if (isEmptyField) {
      // At least one input field is empty
      console.log("Empty field found");
      return;
    }
  };

  useEffect(() => {
    fetchstatus();
    fetchCollegeList();
    console.log(msgs);
  }, [mailstate])

  return (
    <>

      {isLoading && (
        <div className="loading-container">
          <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
        </div>
      )}

      <div style={{ marginBottom: "60px", boxShadow: "rgba(126, 121, 121, 0.6) 0px 3px 19px 7px", padding: "20px", borderRadius: "10px", maxHeight: "70vh", height: "70vh", overflowY: "scroll" }} className='collegesearch'>
        <div>
          <span style={{ fontSize: "28px", fontWeight: "bold", fontFamily: "serif", maxHeight: "404px", overflowY: "scroll" }}>College Notification</span>
        </div>

        <hr />

        <div className='row'>
          <div className='col-lg-4'>
            <p style={{ fontWeight: "bold", color: "black" }}>Enter College Name&nbsp;&nbsp; <span className="text-danger">*</span></p>
          </div>
          <div className='col-lg-3'>
            <p style={{ fontWeight: "bold", color: "black" }}> Enter College Email&nbsp;&nbsp; <span className="text-danger">*</span></p>
          </div>
          <div className='col-lg-3'>
            <p style={{ fontWeight: "bold", color: "black" }}>Enter Comments&nbsp;&nbsp; <span className="text-danger">*</span></p>
          </div>
          <div className='col-lg-1'>

          </div>
          <div className='col-lg-1'>

          </div>
        </div>

        {inputs.map((input, index) => (
          <div key={index} className='clgname'>
            <div className='row' style={{ justifyContent: "center", alignItems: "center" }}>
              <div className='col-lg-3'>
                {/* <input
                  type="text" className='form-control'
                  value={input.collegeName}
                  ref={(el) => (inputRef.current[0] = el)}
                  name='cname'
                  placeholder='Enter college Name'
                  disabled={isLoading}
                  onChange={(e) => handleInputChange(index, 'collegeName', e.target.value)}
                /> */}
                <Select
                  // value={{
                  //   value: input.collId,    // Use 'value' property for the actual value
                  //   label: input.collegeName // Use 'label' property for display label
                  // }}
                  onChange={(selectedOption) => {
                    // Update state based on the selectedOption
                    if (selectedOption && selectedOption.value && selectedOption.label) {
                      handleInputChange(index, 'collegeName', selectedOption.value.colname);
                      handleInputChange(index, 'collId', selectedOption.value.colid);
                    }
                  }}
                  options={options}
                  isSearchable
                  placeholder="Search..."
                  styles={customStyles}
                />


              </div>
              <div className='col-lg-3'>
                <input
                  type="text" className='form-control'
                  value={input.collegeEmail}
                  ref={(el) => (inputRef.current[1] = el)}
                  name='cmail'
                  disabled={isLoading}
                  placeholder='Enter college Email'
                  onChange={(e) => handleInputChange(index, 'collegeEmail', e.target.value)}
                />
              </div>
              <div className='col-lg-3'>
                {input.comments.length > 900 && <p className='text-danger' style={{ fontSize: "12px" }}>Exceeded 900-words.</p>}
                <textarea
                  className="form-control"
                  value={input.comments}
                  ref={(el) => (inputRef.current[2] = el)}
                  name="comments"
                  placeholder='Comments(Max 900 Words)'
                  id="OfficeAddress"
                  disabled={isLoading}
                  maxLength={900}
                  onChange={(e) => handleInputChange(index, 'comments', e.target.value)}
                ></textarea>
              </div>
              <div className='col-lg-1' style={{ textAlign: "center", width: "11.5%" }}>
                <button className='btn btn-primary mail-button' disabled={isLoading} onClick={() => {
                  handleSendMail(input.collId, input.collegeEmail, input.collegeName, input.comments, index);
                }}>Send Mail</button>

              </div>

              <div className='col-lg-1' style={{ textAlign: "center", width: "13.5%", display: "flex", justifyContent: "space-between" }}>
                {index === inputs.length - 1 && (
                  <>

                    <button className='btn btn-primary mail-button' disabled={isLoading} onClick={handleAddInput}>Add</button>
                    {index !== 0 &&
                      <button className='btn btn-danger mail-button' disabled={isLoading} onClick={() => handleRemoveInput(index)}>Remove</button>
                    }
                  </>
                )}
                {index !== inputs.length - 1 && (
                  // <i className="ri-indeterminate-circle-line" disabled={isLoading} onClick={() => handleRemoveInput(index)}></i>
                  <button className='btn btn-danger mail-button' disabled={isLoading} onClick={() => handleRemoveInput(index)}>Remove</button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div >

      <div className='table-container' style={{
        boxShadow: "rgba(126, 121, 121, 0.6) 0px 3px 19px 7px",
        padding: "10px", borderRadius: "10px", maxHeight: "50vh",
        minHeight: "50vh", overflowY: "scroll"
      }}>
        <div>
          <span style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "serif", marginLeft: "7px" }}>Notification Status</span>
        </div><hr style={{ margin: "7px", width: "24%", background: "linear-gradient(62deg, rgb(14 7 122), rgb(3, 21, 106), rgb(90 138 225))", height: "6px", opacity: "1" }} />
        <Table notification={msgs} />
      </div>

    </>
  );
};

export default withAuth(InputForm);
