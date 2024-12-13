import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Studenttable from './studenttable';
import ipAddress from "../ipconfig.js";

const StudentInput = () => {
    const [inputs, setInputs] = useState([{ studentName: '', studentEmail: '', comments: '' }]);
    const [mailstate, setMailstate] = useState(false);
    const [msgs, setMsgs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef([]);

    console.log(msgs);

    async function fetchstatus() {
        const data = await fetch(`http://${ipAddress}:8000/users/studentmailstatus`).then(res => res.json()).then(dataset => setMsgs(dataset));
        return data;
    }


    const handleInputChange = (index, field, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = {
            ...updatedInputs[index],
            [field]: value,
        };
        setInputs(updatedInputs);
    };


    const handleAddInput = () => {
        setInputs([...inputs, { studentName: '', studentEmail: '', comments: '' }]);
    };

    const handleRemoveInput = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };

    const handleSendMail = async (email, clgname, cmnt, index) => {
        focusOnEmptyInput();

        // Prepare data in JSON format
        const jsonData = JSON.stringify({ studentName: clgname, studentEmail: email, comments: cmnt });
        console.log(jsonData); // Display JSON data in the console

        if (clgname.length === 0) {
            return null;
        }
        else if (email.length === 0 || !email.includes("@")) {
            return null;
        }
        else if (cmnt.length === 0 || cmnt.length > 200) {
            return null;
        } else {

            setIsLoading(true);

            // await axios.post("http://103.184.242.25:8000/users/studentmail", {
            await axios.post(`http://${ipAddress}:8000/users/studentmail`, {

                // link: url,
                account: email,
                stuname: clgname,
                comments: cmnt
            });

            setIsLoading(false);
        }
      
        const updatedInputs = [...inputs];
        updatedInputs[index].studentName = '';
        updatedInputs[index].studentEmail = '';
        updatedInputs[index].comments = '';
        setInputs(updatedInputs);
        setMailstate(!mailstate);
    };

    const focusOnEmptyInput = (e) => {
        // e.preventDefault();

        let isEmptyField = false;

        for (let i = 0; i < inputRef.current.length; i++) {
            const input = inputRef.current[i];
            if (input.value.trim() === "" || (input.name === "cmail" && !input.value.includes("@")) || (input.name === "comments" && input.value.length > 200)) {
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
    }, [mailstate])

    return (
        <>

            {isLoading && (
                <div className="loading-container">
                    <img src={"assets/img/loading.gif"} alt="Loading..." className="loading-gif" />
                </div>
            )}


            <div style={{ marginBottom: "30px" }} className='collegesearch'>
                <h3>Student Notification - Manual</h3>
                <hr />

                <div className='row'>
                    <div className='col-lg-3'>
                        <p style={{ fontWeight: "bold", color: "black" }}>Enter Student Name&nbsp;&nbsp; <span className="text-danger">*</span></p>
                    </div>
                    <div className='col-lg-3'>
                        <p style={{ fontWeight: "bold", color: "black" }}> Enter Student Email&nbsp;&nbsp; <span className="text-danger">*</span></p>
                    </div>
                    <div className='col-lg-3'>
                        <p style={{ fontWeight: "bold", color: "black" }}>Enter Comments&nbsp;&nbsp; <span className="text-danger">*</span></p>
                    </div>
                    <div className='col-lg-1'>

                    </div>
                    <div className='col-lg-2'>

                    </div>
                </div>

                {inputs.map((input, index) => (
                    <div key={index} className='clgname'>
                        <div className='row' style={{ justifyContent: "center", alignItems: "center" }}>
                            <div className='col-lg-3'>
                                <input
                                    type="text" className='form-control'
                                    value={input.studentName}
                                    placeholder='Enter student Name'
                                    ref={(el) => (inputRef.current[0] = el)}
                                    name='cname'
                                    disabled={isLoading}
                                    onChange={(e) => handleInputChange(index, 'studentName', e.target.value)}
                                />
                            </div>
                            <div className='col-lg-3'>
                                <input
                                    type="text" className='form-control'
                                    value={input.studentEmail}
                                    ref={(el) => (inputRef.current[1] = el)}
                                    name='cmail'
                                    disabled={isLoading}
                                    placeholder='Enter student Email'
                                    onChange={(e) => handleInputChange(index, 'studentEmail', e.target.value)}
                                />
                            </div>
                            <div className='col-lg-3'>
                                <textarea
                                    className="form-control"
                                    value={input.comments}
                                    ref={(el) => (inputRef.current[2] = el)}
                                    name="comments"
                                    placeholder='Comments(Max 200 Words)'
                                    id="OfficeAddress"
                                    disabled={isLoading}
                                    onChange={(e) => handleInputChange(index, 'comments', e.target.value)}
                                ></textarea>
                            </div>
                            <div className='col-lg-1' style={{ textAlign: "center" }}>
                                {index === inputs.length - 1 && (
                                    <i className="ri-add-fill" disabled={isLoading} onClick={handleAddInput}></i>
                                )}
                                {index !== inputs.length - 1 && (
                                    <i className="ri-indeterminate-circle-line" disabled={isLoading} onClick={() => handleRemoveInput(index)}></i>
                                )}
                            </div>
                            <div className='col-lg-2' style={{ textAlign: "center" }}>
                                <button className='btn btn-primary' disabled={isLoading} onClick={() => {
                                    handleSendMail(input.studentEmail, input.studentName, input.comments, index)
                                }}>Send Mail</button>
                            </div>
                        </div>
                    </div>
                ))}

                <Studenttable notification={msgs} />
            </div>
        </>
    );
};

export default StudentInput;