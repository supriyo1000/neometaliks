// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Universityform = () => {
//     const { srno} = useParams();
//     const [cname, setCname] = useState("");
//     const [cemail, setCemail] = useState("");
//     const [cperson, setCperson] = useState("");
//     const [cpno, setCpno] = useState("");
//     const [cph, setCph] = useState("");
//     const [ca, setCa] = useState("");

//     const [inputs, setInputs] = useState([{ studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' }]);
//     const [mailstate, setMailstate] = useState(false);
//     const [msgs, setMsgs] = useState([]);

//     console.log(srno);

//     console.log(inputs);


//     const handleInputChange = (index, field, value) => {
//         const updatedInputs = [...inputs];
//         updatedInputs[index][field] = value;
//         setInputs(updatedInputs);
//     };

//     const handleAddInput = () => {
//         setInputs([...inputs, { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' }]);
//     };

//     const handleRemoveInput = (index) => {
//         const updatedInputs = [...inputs];
//         updatedInputs.splice(index, 1);
//         setInputs(updatedInputs);
//     };

//     // const url = "http://localhost:3000";

//     const handleform = async () => {

//         const data = await axios.post("http://localhost:8000/users/universityform", {
//             form: inputs, colname: cname, colemail: cemail, colphone: cph, person: cperson, personno: cpno, address: ca, id: srno
//         })

//         // Reset inputs
//         setInputs([{ studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' }]);
//     };



//     return (
//         <div className='container'>
//             <div style={{ textAlign: "center", margin: "3em" }}>
//                 <h3>School/College Registration</h3>
//             </div>
//             <form style={{ backgroundColor: "white", padding: "36px" }} id='universityform'>

//                 <div style={{ marginBottom: "30px" }} >
//                     <h3 className='heading1'>Enter College Details</h3>
//                     <hr />
//                 </div>
//                 <div>
//                     <div class="row">
//                         <div class="col-md-4">
//                             <p>College Name <span class="text-danger">*</span></p>
//                             <input type="text" id="company" name="Father_or_Guardian_Name" class="form-control" onChange={(e) => setCname(e.target.value)} />

//                         </div>

//                         <div class="col-md-4">

//                             <p>College Email Address <span class="text-danger">*</span></p>
//                             <input type="text" id="Occupation" name="Father_Occupation" class="form-control" onChange={(e) => setCemail(e.target.value)} />

//                         </div>

//                         <div class="col-md-4">
//                             <p>College Phone No <span class="text-danger">*</span></p>
//                             <input type="number" id="Officephone" name="Phone" onChange={(e) => setCph(e.target.value)} class="form-control" />

//                         </div>


//                     </div>
//                     <br /> <div class="row">

//                         <div class="col-md-4">
//                             <p>College Contact Person <span class="text-danger">*</span></p>
//                             <input type="text" id="Income" name="Annual_Income" onChange={(e) => setCperson(e.target.value)} class="form-control" />

//                         </div>
//                         <div class="col-md-4">
//                             <p>Contact Person Phone no <span class="text-danger">*</span></p>
//                             <input type="text" id="Income" name="Annual_Income" onChange={(e) => setCpno(e.target.value)} class="form-control" />

//                         </div>

//                         <div class="col-md-4">
//                             <p>College Address <span class="text-danger">*</span></p>
//                             <p><textarea class="form-control" name="Office_Address" id="OfficeAddress" onChange={(e) => setCa(e.target.value)}></textarea></p>

//                         </div>

//                     </div>

//                 </div>

//                 <div style={{ marginBottom: "30px" }}>
//                     <h3 className='heading1'>Enter Student Details</h3>
//                     <hr />
//                     {inputs.map((input, index) => (
//                         <div key={index} className='uniname'>
//                             <div className='row' style={{ justifyContent: "center", alignItems: "center" }}>
//                                 <div className='col-lg-12' style={{ marginBottom: "30px" }}>
//                                     <div className='row'>
//                                         <div className='col-lg-4'>
//                                             <p>Student Name <span class="text-danger">*</span></p>
//                                             <input
//                                                 type="text" className='form-control'
//                                                 value={input.studentName}
//                                                 placeholder='Student Name'
//                                                 onChange={(e) => handleInputChange(index, 'studentName', e.target.value)}
//                                             />
//                                         </div>
//                                         <div className='col-lg-4'>
//                                             <p>Student phone number <span class="text-danger">*</span></p>
//                                             <input
//                                                 type="text" className='form-control'
//                                                 value={input.studentPhone}
//                                                 placeholder='Student phone number'
//                                                 onChange={(e) => handleInputChange(index, 'studentPhone', e.target.value)}
//                                             />
//                                         </div>
//                                         <div className='col-lg-4'>
//                                             <p>Student Grade <span class="text-danger">*</span></p>
//                                             <input
//                                                 type="text" className='form-control'
//                                                 value={input.grade}
//                                                 placeholder='Student Email Address'
//                                                 onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>


//                                 <div className='col-lg-12'>
//                                     <div className='row'>
//                                         <div className='col-lg-4'>
//                                             <p>Student Marks <span class="text-danger">*</span></p>
//                                             <input
//                                                 type="text" className='form-control'
//                                                 value={input.marks}
//                                                 placeholder='Student Marks'
//                                                 onChange={(e) => handleInputChange(index, 'marks', e.target.value)}
//                                             />
//                                         </div>
//                                         <div className='col-lg-4'>
//                                             <p>Remarks <span class="text-danger">*</span></p>
//                                             <input
//                                                 type="text" className='form-control'
//                                                 value={input.remarks}
//                                                 placeholder='Remarks'
//                                                 onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
//                                             />
//                                         </div>
//                                         <div className='col-lg-4' style={{ alignSelf: "end", textAlign: "center" }}>
//                                             {index === inputs.length - 1 && (
//                                                 // <i className="ri-add-fill" onClick={handleAddInput}></i>
//                                                 <button className='btn btn-primary' onClick={handleAddInput}>Add</button>
//                                             )}
//                                             {index !== inputs.length - 1 && (
//                                                 // <i className="ri-indeterminate-circle-line" onClick={() => handleRemoveInput(index)}></i>
//                                                 <button className='btn btn-primary' onClick={() => handleRemoveInput(index)}>Remove</button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div><hr />
//                         </div>
//                     ))}

//                 </div>
//             </form>

//             <div style={{ textAlign: "center" }} className=' mb-5'>
//                 <button className='btn btn-primary' onClick={handleform}>SUBMIT</button>
//             </div>

//         </div>
//     )
// }

// export default Universityform;


// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const UniversityForm = () => {
//     const { srno } = useParams();
//     const [cname, setCname] = useState('');
//     const [cemail, setCemail] = useState('');
//     const [cperson, setCperson] = useState('');
//     const [cpno, setCpno] = useState('');
//     const [cph, setCph] = useState('');
//     const [ca, setCa] = useState('');

//     const [inputs, setInputs] = useState([
//         { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' },
//     ]);

//     const handleInputChange = (index, field, value) => {
//         const updatedInputs = [...inputs];
//         updatedInputs[index][field] = value;
//         setInputs(updatedInputs);
//     };

//     const handleAddInput = () => {
//         setInputs([
//             ...inputs,
//             { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' },
//         ]);
//     };

//     const handleRemoveInput = (index) => {
//         const updatedInputs = [...inputs];
//         updatedInputs.splice(index, 1);
//         setInputs(updatedInputs);
//     };

//     const handleFormSubmit = async () => {
//         try {
//             const response = await axios.post('http://localhost:8000/users/universityform', {
//                 form: inputs,
//                 colname: cname,
//                 colemail: cemail,
//                 colphone: cph,
//                 person: cperson,
//                 personno: cpno,
//                 address: ca,
//                 id: srno,
//             });
//             console.log(response.data); // handle the response from the server
//             setInputs([
//                 { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' },
//             ]); // Reset inputs
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <div style={{ textAlign: 'center', margin: '3em' }}>
//                 <h3>School/College Registration</h3>
//             </div>
//             <form
//                 style={{ backgroundColor: 'white', padding: '36px' }}
//                 id="universityform"
//             >
//                 <div style={{ marginBottom: '30px' }}>
//                     <h3 className="heading1">Enter College Details</h3>
//                     <hr />
//                 </div>
//                 <div>
//                     <div className="row">
//                         <div className="col-md-4">
//                             <p>
//                                 College Name <span className="text-danger">*</span>
//                             </p>
//                             <input
//                                 type="text"
//                                 id="company"
//                                 name="Father_or_Guardian_Name"
//                                 className="form-control"
//                                 onChange={(e) => setCname(e.target.value)}
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <p>
//                                 College Email Address{' '}
//                                 <span className="text-danger">*</span>
//                             </p>
//                             <input
//                                 type="text"
//                                 id="Occupation"
//                                 name="Father_Occupation"
//                                 className="form-control"
//                                 onChange={(e) => setCemail(e.target.value)}
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <p>
//                                 College Phone No <span className="text-danger">*</span>
//                             </p>
//                             <input
//                                 type="number"
//                                 id="Officephone"
//                                 name="Phone"
//                                 onChange={(e) => setCph(e.target.value)}
//                                 className="form-control"
//                             />
//                         </div>
//                     </div>
//                     <br />
//                     <div className="row">
//                         <div className="col-md-4">
//                             <p>
//                                 College Contact Person{' '}
//                                 <span className="text-danger">*</span>
//                             </p>
//                             <input
//                                 type="text"
//                                 id="Income"
//                                 name="Annual_Income"
//                                 onChange={(e) => setCperson(e.target.value)}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <p>
//                                 Contact Person Phone no{' '}
//                                 <span className="text-danger">*</span>
//                             </p>
//                             <input
//                                 type="text"
//                                 id="Income"
//                                 name="Annual_Income"
//                                 onChange={(e) => setCpno(e.target.value)}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <p>
//                                 College Address <span className="text-danger">*</span>
//                             </p>
//                             <textarea
//                                 className="form-control"
//                                 name="Office_Address"
//                                 id="OfficeAddress"
//                                 onChange={(e) => setCa(e.target.value)}
//                             ></textarea>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ marginBottom: '30px' }}>
//                     <h3 className="heading1">Enter Student Details</h3>
//                     <hr />
//                     {inputs.map((input, index) => (
//                         <div key={index} className="uniname">
//                             <div
//                                 className="row"
//                                 style={{ justifyContent: 'center', alignItems: 'center' }}
//                             >
//                                 <div
//                                     className="col-lg-12"
//                                     style={{ marginBottom: '30px' }}
//                                 >
//                                     <div className="row">
//                                         <div className="col-lg-4">
//                                             <p>
//                                                 Student Name{' '}
//                                                 <span className="text-danger">*</span>
//                                             </p>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={input.studentName}
//                                                 placeholder="Student Name"
//                                                 onChange={(e) =>
//                                                     handleInputChange(index, 'studentName', e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                         <div className="col-lg-4">
//                                             <p>
//                                                 Student phone number{' '}
//                                                 <span className="text-danger">*</span>
//                                             </p>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={input.studentPhone}
//                                                 placeholder="Student phone number"
//                                                 onChange={(e) =>
//                                                     handleInputChange(index, 'studentPhone', e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                         <div className="col-lg-4">
//                                             <p>
//                                                 Student Grade{' '}
//                                                 <span className="text-danger">*</span>
//                                             </p>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={input.grade}
//                                                 placeholder="Student Email Address"
//                                                 onChange={(e) =>
//                                                     handleInputChange(index, 'grade', e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-12">
//                                     <div className="row">
//                                         <div className="col-lg-4">
//                                             <p>
//                                                 Student Marks{' '}
//                                                 <span className="text-danger">*</span>
//                                             </p>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={input.marks}
//                                                 placeholder="Student Marks"
//                                                 onChange={(e) =>
//                                                     handleInputChange(index, 'marks', e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                         <div className="col-lg-4">
//                                             <p>
//                                                 Remarks <span className="text-danger">*</span>
//                                             </p>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={input.remarks}
//                                                 placeholder="Remarks"
//                                                 onChange={(e) =>
//                                                     handleInputChange(index, 'remarks', e.target.value)
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div
//                                 className="col-lg-12"
//                                 style={{
//                                     textAlign: 'center',
//                                     marginBottom: '30px',
//                                     marginTop: '30px',
//                                 }}
//                             >
//                                 {inputs.length > 1 && (
//                                     <button
//                                         className="btn btn-danger"
//                                         onClick={() => handleRemoveInput(index)}
//                                     >
//                                         Remove
//                                     </button>
//                                 )}
//                                 {inputs.length - 1 === index && (
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={handleAddInput}
//                                     >
//                                         Add
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="row">
//                     <div
//                         className="col-md-12"
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <button
//                             type="button"
//                             className="btn btn-primary"
//                             onClick={handleFormSubmit}
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UniversityForm;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UniversityForm = () => {
    const { srno } = useParams();
    const [cname, setCname] = useState('');
    const [cemail, setCemail] = useState('');
    const [cperson, setCperson] = useState('');
    const [cpno, setCpno] = useState('');
    const [cph, setCph] = useState('');
    const [ca, setCa] = useState('');

    const [inputs, setInputs] = useState([
        { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = value;
        setInputs(updatedInputs);
    };

    const handleAddInput = () => {
        setInputs([
            ...inputs,
            { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' },
        ]);
    };

    const handleRemoveInput = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };

    const handleFormSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/universityform', {
                form: inputs,
                colname: cname,
                colemail: cemail,
                colphone: cph,
                person: cperson,
                personno: cpno,
                address: ca,
                id: srno,
            });
            console.log(response.data); // handle the response from the server
            setInputs([
                { studentName: '', grade: '', studentPhone: '', marks: '', remarks: '' },
            ]); // Reset inputs
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            <div style={{ textAlign: 'center', margin: '3em' }}>
                <h3>School/College Registration</h3>
            </div>
            <form
                style={{ backgroundColor: 'white', padding: '36px', marginBottom: "60px", boxShadow: "rgb(126 121 121 / 60%) 0px 3px 19px", padding: "20px", borderRadius: "10px" }}
                id="universityform"
            >
                <div style={{ marginBottom: '30px' }}>
                    <label className="heading1">Enter College Details</label>
                    <hr />
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <p>
                                College Name <span className="text-danger">*</span>
                            </p>
                            <input
                                type="text"
                                id="company"
                                name="Father_or_Guardian_Name"
                                className="form-control"
                                onChange={(e) => setCname(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <p>
                                College Email Address{' '}
                                <span className="text-danger">*</span>
                            </p>
                            <input
                                type="text"
                                id="Occupation"
                                name="Father_Occupation"
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
                                name="Phone"
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
                                name="Annual_Income"
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
                                type="text"
                                id="Income"
                                name="Annual_Income"
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
                                name="Office_Address"
                                id="OfficeAddress"
                                onChange={(e) => setCa(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <label className="heading1">Enter Student Details</label>
                    <hr />
                    {inputs.map((input, index) => (
                        <div key={index} className="uniname">
                            <div
                                className="row"
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <div
                                    className="col-lg-12"
                                    style={{ marginBottom: '30px' }}
                                >
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <p>
                                                Student Name{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.studentName}
                                                placeholder="Student Name"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'studentName', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <p>
                                                Student phone number{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.studentPhone}
                                                placeholder="Student phone number"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'studentPhone', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <p>
                                                Student Grade{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.grade}
                                                placeholder="Student Email Address"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'grade', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <p>
                                                Student Marks{' '}
                                                <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.marks}
                                                placeholder="Student Marks"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'marks', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <p>
                                                Remarks <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={input.remarks}
                                                placeholder="Remarks"
                                                onChange={(e) =>
                                                    handleInputChange(index, 'remarks', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-12"
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '30px',
                                    marginTop: '30px',
                                }}
                            >
                                {inputs.length > 1 && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveInput(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                                {inputs.length - 1 === index && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAddInput}
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                        </div>
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
    );
};

export default UniversityForm;
