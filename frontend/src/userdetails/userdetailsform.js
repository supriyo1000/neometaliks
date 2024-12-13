// UserDetailsForm.js
import React from 'react';

const UserDetailsForm = ({ phone, education, stream, position, experience, lastcom, gender, other, setPhone, setEducation, setStream, setPosition, setExperience, setLastcom, setGender, setOther }) => {
    return (
    <>
        <form action="#" style={{ marginTop: "50px" }}>
            <div class="user__details">
                <div className='row' style={{
                    width: "100%",
                    background: "white"
                }}>
                    <div className='col-md-6 m-col'>

                        <div class="input__box">
                            <span class="details">Email Address</span>
                           
                            <select className="form-select" aria-label="Default select example" onChange={handleRoleSelect} value={selectedEmail || ''}>
                                <option disabled value="">Select Email</option>
                                {email.map((role, index) => (
                                    <option value={role.roleId} key={role.roleId}>
                                        {role.userEmail}
                                    </option>
                                ))}
                            </select>


                        </div>
                        <div class="input__box">
                            <span class="details">Full Name</span>
                            <p>{fname} {lname}</p>
                        </div>
                        <div class="input__box">
                            <span class="details">Role</span>
                            <p>{role}</p>
                        </div>
                        <div class="input__box">
                            <span class="details">Creation Date</span>
                            <p>{date}</p>
                        </div>
                    </div>
                    <div className='col-md-6  m-col2'>
                        <div class="input__box">
                            <span class="details">Phone Number <span class="text-danger">*</span></span>
                            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phone} placeholder="012-345-6789" required onChange={(e) => dispatch(setPhone(e.target.value))} />
                        </div>
                        <div class="input__box">
                            <span class="details">Higher Education Details <span class="text-danger">*</span></span>
                            <input type="text" placeholder="e.g   B.Com , B.A" value={education} onChange={(e) => dispatch(setEducation(e.target.value))} required />
                        </div>
                        <div class="input__box">
                            <span class="details">Stream <span class="text-danger">*</span></span>
                            <input type="text" placeholder="e.g   Accounts Honours " value={stream} onChange={(e) => dispatch(setStream(e.target.value))} required />
                        </div>
                        <div class="input__box">
                            <span class="details">position <span class="text-danger">*</span></span>
                            <input type="text" placeholder="e.g    In Company " value={position} onChange={(e) => dispatch(setPosition(e.target.value))} required />
                        </div>
                        <div class="input__box">
                            <span class="details">Experience <span class="text-danger">*</span></span>
                            <input type="text" placeholder="e.g   In Neo Metaliks " value={experience} onChange={(e) => dispatch(setExperience(e.target.value))} required />
                        </div>

                    </div>
                </div>



            </div>
            <div className='row' style={{ padding: "0px 24px 12px 0" }}>
                <div className='col-md-6'>
                    <div class="input__box">
                        <span class="details">Last Company Name <span class="text-danger">*</span></span>
                        <input type="text" placeholder="e.g   In Neo Metaliks " value={lastcom} onChange={(e) => dispatch(setLastcom(e.target.value))} required />
                    </div>

                </div>
                <div className='col-md-6'>
                    <div class="input__box">
                        <span class="details">Address <span class="text-danger">*</span></span>
                        <textarea class="form-control" name="Office_Address" id="OfficeAddress" value={add} onChange={(e) => dispatch(setAdd(e.target.value))}></textarea>
                    </div>

                </div>
            </div>
            <div className='row' style={{ padding: "0px 24px 12px 0" }}>
                <div className='col-md-6'>
                    <div class="input__box">
                        <div class="gender__details" >
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

                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-md-6'>
                    <div class="input__box">
                        <span class="details">Others <span class="text-danger">*</span></span>
                        <textarea class="form-control" value={other} name="Office_Address" id="OfficeAddress" onChange={(e) => dispatch(setOther(e.target.value))}></textarea>
                    </div>

                </div>
            </div>

            <button className='btn btn-primary' style={{ border: "2px solid #6a4b4b" }} onClick={handleSubmit}>Save</button>
        </form>
        </>
    )
};

export default UserDetailsForm;
