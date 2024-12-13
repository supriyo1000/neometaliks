import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ipAddress from './ipconfig';
import Select from 'react-select';
import "./App.css"

const UniversityForm = () => {
    const { srNo } = useParams();
    const srno = srNo.substring(12);
    const [cname, setCname] = useState('');
    const [cemail, setCemail] = useState('');
    const [cperson, setCperson] = useState('');
    const [cpno, setCpno] = useState('');
    const [cph, setCph] = useState('');
    const [ca, setCa] = useState('');
    const inputRef = useRef([]);


    const options = [
        { value: 'BENGAL COLLEGE OF ENGINEERING & TECHNOLOGY', label: 'BENGAL COLLEGE OF ENGINEERING & TECHNOLOGY' },
        { value: 'ADAMAS INSTITUTE OF TECHNOLOGY', label: 'ADAMAS INSTITUTE OF TECHNOLOGY' },
        { value: 'SUPREME KNOWLEDGE FOUNDATION GROUP OF INSTITUTIONS', label: 'SUPREME KNOWLEDGE FOUNDATION GROUP OF INSTITUTIONS' },
        { value: 'DURGAPUR INSTITUTE OF MANAGEMENT AND SCIENCE', label: 'DURGAPUR INSTITUTE OF MANAGEMENT AND SCIENCE' },
        { value: 'APEX MANAGEMENT INSTITUTE', label: 'APEX MANAGEMENT INSTITUTE' },
        { value: 'NARULA INSTITUTE OF TECHNOLOGY', label: 'NARULA INSTITUTE OF TECHNOLOGY' },
        { value: 'RCC INSTITUTE OF INFORMATION TECHNOLOGY', label: 'RCC INSTITUTE OF INFORMATION TECHNOLOGY' },
        { value: 'ASANSOL ENGINEERING COLLEGE', label: 'ASANSOL ENGINEERING COLLEGE' },
        { value: 'TECHNO INDIA', label: 'TECHNO INDIA' },
        { value: 'SWAMI VIVEKANANDA INSTITUTE OF MANAGEMENT & COMPUTER SCIENCE', label: 'SWAMI VIVEKANANDA INSTITUTE OF MANAGEMENT & COMPUTER SCIENCE' },
        { value: 'NSHM KNOWLEDGE CAMPUS, DURGAPUR - GROUP OF INSTITUTIONS', label: 'NSHM KNOWLEDGE CAMPUS, DURGAPUR - GROUP OF INSTITUTIONS' },
        { value: 'DUMKAL INSTITUTE OF ENGINEERING & TECHNOLOGY', label: 'DUMKAL INSTITUTE OF ENGINEERING & TECHNOLOGY' },
        { value: 'NETAJI SUBHASH ENGINEERING COLLEGE', label: 'NETAJI SUBHASH ENGINEERING COLLEGE' },
        { value: 'DR. B.C. ROY ENGINEERING COLLEGE', label: 'DR. B.C. ROY ENGINEERING COLLEGE' },
        { value: 'BANKURA UNNAYANI INSTITUTE OF ENGINEERING', label: 'BANKURA UNNAYANI INSTITUTE OF ENGINEERING' },
        { value: 'FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT', label: 'FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT' },
        { value: 'B. P. PODDAR INSTITUTE OF MANAGEMENT & TECHNOLOGY', label: 'B. P. PODDAR INSTITUTE OF MANAGEMENT & TECHNOLOGY' },
        { value: 'GOENKA COLLEGE OF COMMERCE AND BUSINESS ADMINISTRATION', label: 'GOENKA COLLEGE OF COMMERCE AND BUSINESS ADMINISTRATION' },
        { value: 'CAMELLIA INSTITUTE OF TECHNOLOGY', label: 'CAMELLIA INSTITUTE OF TECHNOLOGY' },
        { value: 'HOOGHLY ENGINEERING & TECHNOLOGY COLLEGE', label: 'HOOGHLY ENGINEERING & TECHNOLOGY COLLEGE' },
        { value: 'GOVT. COLLEGE OF ENGG. & TEXTILE TECHNOLOGY', label: 'GOVT. COLLEGE OF ENGG. & TEXTILE TECHNOLOGY' },
        { value: 'KANAD INSTITUTE OF ENGINEERING & MANAGEMENT', label: 'KANAD INSTITUTE OF ENGINEERING & MANAGEMENT' },
        { value: 'BUDGE BUDGE INSTITUTE OF TECHNOLOGY', label: 'BUDGE BUDGE INSTITUTE OF TECHNOLOGY' },
        { value: 'JIS COLLEGE OF ENGINEERING', label: 'JIS COLLEGE OF ENGINEERING' },
        { value: 'DREAM INSTITUTE OF TECHNOLOGY', label: 'DREAM INSTITUTE OF TECHNOLOGY' },
        { value: "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS", label: "SANAKA EDUCATIONAL TRUST'S GROUP OF INSTITUTIONS" },
        { value: 'MCKV INSTITUTE OF ENGINEERING', label: 'MCKV INSTITUTE OF ENGINEERING' },
        { value: 'SILIGURI INSTITUTE OF TECHNOLOGY', label: 'SILIGURI INSTITUTE OF TECHNOLOGY' },
        { value: 'INSTITUTE OF HOTEL AND RESTAURANT MANAGEMENT', label: 'INSTITUTE OF HOTEL AND RESTAURANT MANAGEMENT' },
        { value: 'DR. SUDHIR CHANDRA SUR DEGREE ENGINEERING COLLEGE', label: 'DR. SUDHIR CHANDRA SUR DEGREE ENGINEERING COLLEGE' },
        { value: 'NETAJI SUBHAS CHANDRA BOSE INSTITUTE OF PHARMACY', label: 'NETAJI SUBHAS CHANDRA BOSE INSTITUTE OF PHARMACY' },
        { value: 'PAILAN COLLEGE OF MANAGEMENT & TECHNOLOGY', label: 'PAILAN COLLEGE OF MANAGEMENT & TECHNOLOGY' },
        { value: 'KINGSTON ENGINEERING COLLEGE', label: 'KINGSTON ENGINEERING COLLEGE' },
        { value: 'FALAKATA POLYTECHNIC', label: 'FALAKATA POLYTECHNIC' },
        { value: 'NIBEDITA INSTITUTE OF TECHNOLOGY', label: 'NIBEDITA INSTITUTE OF TECHNOLOGY' },
        { value: 'JADAVPUR UNIVERSITY', label: 'JADAVPUR UNIVERSITY' },
        { value: 'GURU NANAK INSTITUTE OF PHARMACEUTICAL SCIENCE & TECHNOLOGY', label: 'GURU NANAK INSTITUTE OF PHARMACEUTICAL SCIENCE & TECHNOLOGY' },
        { value: 'JYOTIRMOY SCHOOL OF BUSINESS', label: 'JYOTIRMOY SCHOOL OF BUSINESS' },
        { value: 'KALNA POLYTECHNIC', label: 'KALNA POLYTECHNIC' },
        { value: 'DURGAPUR SOCIETY OF MANAGEMENT SCIENCE', label: 'DURGAPUR SOCIETY OF MANAGEMENT SCIENCE' },
        { value: "WOMEN'S POLYTECHNIC", label: "WOMEN'S POLYTECHNIC" },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const [inputs, setInputs] = useState([
        { studentName: '', grade: '', studentPhone: '', marks: '', email: '', remarks: '' },
    ]);

    const studentinputRef = useRef(inputs.map(() => [null, null, null, null, null, null]));

    const fetchCollegeName = async (colid) => {
        const response = await fetch(`http://${ipAddress}:8000/users/get_college_name?colid=${colid}`).then(res => res.json());
        if (response && response.collegename) {
            setCname(response.collegename)
        }
    }
    console.log(cname);
    console.log(srno);

    // console.log("srno", srno, "srNo", srNo);
    // console.log(cname, cemail, cperson, cpno, cph, ca);
    // console.log("inputs", inputs);

    const handleInputChange = (index, field, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = value;
        setInputs(updatedInputs);
    };

    // const handleAddInput = () => {
    //     setInputs([
    //         ...inputs,
    //         { studentName: '', grade: '', studentPhone: '', marks: '', email: '', remarks: '' },
    //     ]);
    // };

    const handleAddInput = () => {
        const newInput = {
            studentName: '',
            grade: '',
            studentPhone: '',
            marks: '',
            email: '',
            remarks: '',
        };
        setInputs([...inputs, newInput]);

        // Add a new empty array to studentinputRef
        studentinputRef.current.push([null, null, null, null, null, null]);
    };



    const handleRemoveInput = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);

    };


    const focusOnEmptyInput = (e) => {
        // e.preventDefault();

        let isEmptyField = false;

        for (let i = 1; i < inputRef.current.length; i++) {
            const input = inputRef.current[i];
            if (input.value.trim() === "" || (input.name === "cphone" && input.value.length !== 10) || (input.name === "cpno" && input.value.length !== 10) || (input.name === "collegeemail" && !input.value.includes("@")) || (input.name === "sphone" && input.value.length !== 10) || (input.name === "semail" && !input.value.includes("@")) || (input.name === "remarks" && input.value.length > 200) || (input.name === "ca" && input.value.length > 200)) {
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

    async function highlightInput(input) {
        await input.focus();
        input.style.backgroundColor = "antiquewhite";
        input.addEventListener("change", () => {
            input.style.backgroundColor = "white";
        });
    };

    async function focusOnEmptyStudentInput() {
        console.log("calling focusOnEmptyStudentInput");
        try {
            for (let i = 0; i < studentinputRef.current.length; i++) {
                const nameInput = studentinputRef.current[i][0];
                const phoneInput = studentinputRef.current[i][1];
                const gradeInput = studentinputRef.current[i][2];
                const marksInput = studentinputRef.current[i][3];
                const emailInput = studentinputRef.current[i][4];
                const remarksInput = studentinputRef.current[i][5];
                console.log(nameInput, phoneInput, gradeInput, marksInput, emailInput, remarksInput);
                if (nameInput.value.trim() === "") {
                    highlightInput(nameInput);
                    console.log(`Empty input found at row ${i}, column 0`);
                    break
                }
                else if (phoneInput.value.trim() === "") {
                    highlightInput(phoneInput);
                    console.log(`Empty input found at row ${i}, column 1`);
                    break;
                }
                else if (gradeInput.value.trim() === "") {
                    highlightInput(gradeInput);
                    console.log(`Empty input found at row ${i}, column 2`);
                    break;
                }
                else if (marksInput.value.trim() === "") {
                    highlightInput(marksInput);
                    console.log(`Empty input found at row ${i}, column 3`);
                    break;
                }
                else if (emailInput.value.trim() === "") {
                    highlightInput(emailInput);
                    console.log(`Empty input found at row ${i}, column 4`);
                    break;
                }
                else if (remarksInput.value.trim() === "") {
                    highlightInput(remarksInput);
                    console.log(`Empty input found at row ${i}, column 5`);
                    break;
                };
            }
        } catch (error) {
            console.log(error);
        }
    }


    const focusOnExistingStudent = (existingStudentName) => {
        console.log("exist", existingStudentName);
        console.log("lgnth", studentinputRef.current.length);
        try {
            for (let i = 0; i < studentinputRef.current.length; i++) {
                const nameInput = studentinputRef.current[i][0];
                const phoneInput = studentinputRef.current[i][1];
                const emailInput = studentinputRef.current[i][4];

                // console.log(nameInput,phoneInput,emailInput);
                if (nameInput.value.trim() === existingStudentName) {
                    highlightInput(nameInput);
                    console.log(`Empty input found at row ${i}, column 0`);
                    break
                }
                else if (phoneInput.value.trim() === existingStudentName) {
                    highlightInput(phoneInput);
                    console.log(`Empty input found at row ${i}, column 1`);
                    break;
                }
                else if (emailInput.value.trim() === existingStudentName) {
                    highlightInput(emailInput);
                    console.log(`Empty input found at row ${i}, column 4`);
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleFormSubmit = async () => {

        focusOnEmptyInput();
        focusOnEmptyStudentInput();

        if (cname.length === 0) {
            return null;
        }
        else if (cemail.length === 0 || !cemail.includes("@")) {
            return null;
        }
        else if (cph.length === 0 || cph.length !== 10) {
            return alert("Please enter a Valid College Phone Number");
        }
        else if (cperson.length === 0) {
            return null;
        }
        else if (cpno.length === 0 || cpno.length !== 10) {
            return alert("Please enter a Valid Contact Person's Number");
        }
        else if (ca.length === 0 || ca.length > 200) {
            return null;
        }

        else if (inputs.some((input) => {
            return (
                input.studentName.length === 0 ||
                input.studentPhone.length === 0 ||
                input.studentPhone.length !== 10 ||
                input.grade.length === 0 ||
                input.marks.length === 0 ||
                input.email.length === 0 ||
                !input.email.includes("@") ||
                input.remarks.length === 0 ||
                input.remarks.length > 200
            );
        })) {
            return null;
        }


        else {
            try {
                const response = await axios.post(`http://${ipAddress}:8000/users/universityform`, {
                    form: inputs,
                    colname: cname,
                    colemail: cemail,
                    colphone: cph,
                    person: cperson,
                    personno: cpno,
                    address: ca,
                    id: srno,
                });
                if (response.data.errorCode === 1) {
                    alert("Student Name Already Exists");
                    focusOnExistingStudent(response.data.errorStatus);
                }
                else if (response.data.errorCode === 2) {
                    alert("Student Email Already Exists");
                    focusOnExistingStudent(response.data.errorStatus);
                }
                else if (response.data.errorCode === 3) {
                    alert("Student Phone Number Already Exists");
                    focusOnExistingStudent(response.data.errorStatus);
                }
                else {
                    alert("Students Data Uploaded Successfully !!!");
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }

        }

    };
    useEffect(() => {
        fetchCollegeName(srno);
        console.log(srno);
    }, [])

    return (
        <>
            <div className="container">
                <div>

                    <img src="assets/img/neologo.jpg" alt="" style={{ width: "20%", maxHeight: "none", margin: "0px 100px" }} />
                    <div style={{ textAlign: 'center', marginBottom: "40PX" }}>
                        <h3>School/College Registration</h3>
                    </div>
                </div>

                <form
                    style={{ backgroundColor: 'white', padding: '23px', boxShadow: "0px -2px 16px 5px #000000b5" }}
                    id="universityform"
                >
                    <div style={{
                        marginBottom: '30px', background: "#679dff",
                        borderRadius: "10px", padding: "25px 16px"
                    }}>
                        <h3 className="heading1">Enter College Details</h3>
                        <hr />
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>
                                        College Name <span className="text-danger">*</span>
                                    </p>

                                    <p className="form-control">{cname}</p>

                                    {/* <input
                                        type="text"
                                        id="company"
                                        ref={(el) => (inputRef.current[0] = el)}
                                        name="collegename"
                                        className="form-control"
                                        onChange={(e) => setCname(e.target.value)}
                                    /> */}

                                </div>
                                <div className="col-md-4">
                                    <p>
                                        College Email Address{' '}
                                        <span className="text-danger">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        id="Occupation"
                                        ref={(el) => (inputRef.current[1] = el)}
                                        name="collegeemail"
                                        className="form-control"
                                        onChange={(e) => setCemail(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p>
                                        College Phone No <span className="text-danger">*</span>
                                    </p>
                                    <input
                                        type="number"
                                        id="Officephone"
                                        maxLength={10}
                                        ref={(el) => (inputRef.current[2] = el)}
                                        name="cphone"
                                        onChange={(e) => setCph(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <p>
                                        College Contact Person{' '}
                                        <span className="text-danger">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        id="Income"
                                        ref={(el) => (inputRef.current[3] = el)}
                                        name="cperson"
                                        onChange={(e) => setCperson(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p>
                                        Contact Person Phone no{' '}
                                        <span className="text-danger">*</span>
                                    </p>
                                    <input
                                        type="number"
                                        id="Income"
                                        maxLength={10}
                                        ref={(el) => (inputRef.current[4] = el)}
                                        name="cpno"
                                        onChange={(e) => setCpno(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <p>
                                        College Address <span className="text-danger">*</span>
                                    </p>
                                    <textarea
                                        className="form-control"
                                        ref={(el) => (inputRef.current[5] = el)}
                                        name="ca"
                                        id="OfficeAddress"
                                        placeholder='(Max 200 Words)'
                                        onChange={(e) => setCa(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginBottom: '30px', maxHeight: "58vh", overflowY: "scroll", overflowX: "hidden"
                    }}>
                        <h3 className="heading1">Enter Student Details</h3>
                        <hr />
                        {inputs.map((input, index) => (
                            <>
                                <div key={index} className="uniname">
                                    <div
                                        className="row"
                                        style={{ justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <div className="col-lg-2">
                                            <p>
                                                Student Name{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={(el) => (studentinputRef.current[index][0] = el)}
                                                value={input.studentName}
                                                name='studentName'
                                                placeholder="Student Name"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'studentName', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-2">
                                            <p>
                                                Student Mobile{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.studentPhone}
                                                maxLength={10}
                                                ref={(el) => (studentinputRef.current[index][1] = el)}
                                                name='sphone'
                                                placeholder="Student phone"
                                                pattern="[0-9]*"
                                                onChange={(e) => {
                                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                                    handleInputChange(index, 'studentPhone', numericValue)
                                                }

                                                }
                                            />
                                        </div>
                                        <div className="col-lg-1">
                                            <p>
                                                Grade{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                ref={(el) => (studentinputRef.current[index][2] = el)}
                                                value={input.grade}
                                                name='grade'
                                                placeholder="Grade"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'grade', e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-lg-1">
                                            <p>
                                                Marks(%)
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.marks}
                                                ref={(el) => (studentinputRef.current[index][3] = el)}
                                                name='marks'
                                                placeholder="Marks"
                                                onChange={(e) => {

                                                    const numericValue = e.target.value.replace(/[^0-9.]/g, '');

                                                    // Validate and set the value
                                                    if (!isNaN(numericValue)) {
                                                        handleInputChange(index, 'marks', numericValue);
                                                    }
                                                }
                                                }
                                            />
                                        </div>

                                        <div className="col-lg-2">
                                            <p>
                                                Email Id
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.email}
                                                ref={(el) => (studentinputRef.current[index][4] = el)}
                                                name='semail'
                                                placeholder="student email"
                                                onChange={(e) => {
                                                    handleInputChange(index, 'email', e.target.value)
                                                }

                                                }
                                            />
                                        </div>

                                        <div className="col-lg-2" >
                                            <p>
                                                Remarks <span className="text-danger">*</span>
                                            </p>
                                            <textarea
                                                className="form-control"
                                                value={input.remarks}
                                                maxLength={200}
                                                ref={(el) => (studentinputRef.current[index][5] = el)}
                                                name='remarks'
                                                id="OfficeAddress"
                                                placeholder="Remarks(Max 200 Words)"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'remarks', e.target.value)
                                                }
                                            ></textarea>
                                        </div>
                                        <div
                                            className="col-lg-2"
                                            style={{
                                                textAlign: 'center',
                                                marginBottom: '5px',
                                                marginTop: '30px',
                                                display: "flex", justifyContent: "space-evenly"
                                            }}
                                        >
                                            {
                                                inputs.length > 1 && (
                                                    <button
                                                        className="btn btn-danger mail-button"
                                                        onClick={() => handleRemoveInput(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}

                                            {index === inputs.length - 1 && (
                                                <button
                                                    className="btn btn-primary mail-button"
                                                    onClick={handleAddInput}
                                                >
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                    <div className="row">
                        <div
                            className="col-md-12"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleFormSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='mt-5 container'>
                <img src='qlogo.jpg' alt='qlogo' style={{ width: "106px" }} />
                <p>Developed And Maintained By <strong>Quobotic Consulting Private Limited</strong></p>
            </div>

        </>
    );
};

export default UniversityForm;
